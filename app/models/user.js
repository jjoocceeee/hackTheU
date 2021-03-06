import { create } from 'domain';

const mongoose = require('mongoose');
import bcrypt from 'bcrypt-nodejs';
import findOrCreate from 'findorcreate-promise';
import BankAccount from './bankAccount';

const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    description: "The primary email of the user.",
    index: true
  },
  username: {
    type: String,
    required: true,
    description: "The name that is publically displayed",
    index: true
  },
  googleId: {
    type: Types.ObjectId,
    ref: 'GoogleUser',
    description: 'The id of the google user in the database.',
    index: true
  },
  maxSavings: {
    type: Number,
    required: true,
    description: "Max amount of money to put into savings account",
    default: 1000
  },
  BankAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount'
  },
  socialProfileID: {
    type: [{
      type: Types.ObjectId,
      ref: 'GoogleUser',
    }],
    description: 'The ids of a users social profiles.',
  }
}, { timestamps: true });

UserSchema.plugin(findOrCreate);

UserSchema.pre('save', async function(next)
{
  var user = this;

  if (this.isNew)
  {
    const bankAccount = await BankAccount.create({
      checking: 500,
      savings: 0
    });
    var res = await context.fb.api("me/feed?fields=reactions.summary(true)", { access_token: process.env.FACEBOOK_ACCESS_TOKEN });

    const socialProfile = await SocialProfile.create({
      interactions: res.data[0].reactions,
      dailyInteractions: 100 //TODO
    });
    this.BankAccountId = bankAccount._id;
  }
  return next();
});


export const User = mongoose.model('User', UserSchema);
export default User;
