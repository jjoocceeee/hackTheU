import _ from 'lodash';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GetUser } from './oauth';

import { User } from '../models/user';
import { GoogleUser } from '../models/googleUser';

const extractProfile = profile => {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`${process.env.WEB_URI}/auth/google/callback`,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try
    {
      const user = await Handler({req, accessToken, refreshToken, profile});
      if (user)
      {
        req.info = {}; // Add this so it logs to analytics.
        LogAction(req, 'userSignInGoogle', {
          userId: user._id
        });
        done(null, user);
      }
      else
      {
        console.log(`Failed to get user for: ${profile.id}`);
        done(null, null);
      }
    }
    catch(err)
    {
      console.log(err);
      if (DEVELOPMENT) done(err, null, { message: err });
      else done(null, null);
    }
  }
);

const Handler = async ({req, accessToken, refreshToken, profile}) => {
  let user = await GetUser({
    req,
    verified: true,
    email: profile.emails[0].value,
    username: profile.id
  });
  let gu = await CreateGoogleUser(profile);

  await User.update({_id: user._id}, { $set: { googleId: gu._id }, $inc: { signInCount: 1 } });
  return user;
}

const CreateGoogleUser = async (profile) => {
  let values = _.pick(profile, ['id', 'emails', 'gender', 'displayName']);
  values = _.merge(values, _.pick(profile._json, ['language', 'aboutMe', 'url', 'image', 'isPlusUser', 'verified']));
  const res = await GoogleUser.findOrCreate({ id: profile.id }, values, {upsert: true});
  if (res.errors) console.log(res.errors);
  return res.result;
}

export default googleStrategy;
