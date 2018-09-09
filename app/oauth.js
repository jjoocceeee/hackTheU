import passport from 'passport';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { User } from './models/user';

const SaveRedirect = (req, res, next) => {
  req.session.redirect = {
    pass: req.query.pass,
    fail: req.query.fail
  };
  next();
}

const HandleRedirect = ({req, res, pass}) => {
  if (pass && req.session.redirect && req.session.redirect.pass)
  {
    const redirect = req.session.redirect;
    delete(req.session.redirect);
    res.redirect(redirect.pass);
  }
  else if (!pass && req.session.redirect && req.session.redirect.fail)
  {
    const redirect = req.session.redirect;
    delete(req.session.redirect);
    res.redirect(redirect.fail);
  }
  else
  {
    if (req.session.redirect)
    {
      delete(req.session.redirect);
    }
    res.redirect(`${process.env.WEB_URI}${DEVELOPMENT ? '/graphiql' : '/'}`);
  }
}

const GenerateJwt = (req, res) => {
  const user = req.session.passport.user;
  // generate login token
  const tokenPayload = {
    user: user._id,
    exp: moment().add(30, 'days').unix()
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  let opts = !DEVELOPMENT ? {
   secure: true,
   domain: process.env.JWT_DOMAIN
  } : {};
  // Increment signInCount and save lastIp
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  User.update({_id: user._id}, { $set: { lastIp: ipAddress }, $inc: { signInCount: 1 } }).exec();

  // Send the jwt cookie to the client.
  res.cookie('jwt', token, opts);
}

 export const OAuth = (app) => {
  app.get('/auth/verify', async (req, res) => {
    await User.update({ "emailVerification.hash": req.query.id }, { $set: { verified: true, emailVerification: null } });
    res.redirect(req.query.redirect || process.env.WEB_URI);
  });

  app.get('/auth/fail', (req, res) => {
    HandleRedirect({req, res, pass: false});
  });

  app.get(
    '/auth/google',
    SaveRedirect,
    passport.authenticate('google', { scope: [ 'email', 'profile' ]})
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    (req, res) => {
      GenerateJwt(req, res);
      HandleRedirect({req, res, pass: true});
    }
  );
}

export default OAuth;
