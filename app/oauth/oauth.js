import { User } from '../models/user';

export const GetUser = async ({req, email, username, verified = true}) => {
  let user;
  if (req.session && req.session.passport && req.session.passport.user)
  {
    // Use the already logged in user.
    user = req.session.passport.user;
  }
  else
  {
    // Find or create a user for the discord email.
    if (!verified) throw new Error('Email not verified with auth provider.');
    user = await User.findOne({email: email});
    if (!user)
    {
      user = await User.create({ email: email, username: username })
    }
  }
  return user;
}
