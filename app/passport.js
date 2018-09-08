import _ from 'lodash';
import passport from 'passport';

import { User } from './models/user';

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import GoogleStrategy from './oauth/google';

passport.use(GoogleStrategy);

const cookieExtractor = req => {
  return (req && req.cookies) ? req.cookies.jwt : null;
};

let opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor
  ]),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) =>
{
  if (!jwt_payload.user) console.warn(`User not found in jwt payload.`);
  User.findById(jwt_payload.user, (err, user) => {
    return done(err, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
