import { create } from 'domain';

const mongoose = require('mongoose');
import bcrypt from 'bcrypt-nodejs';
import findOrCreate from 'findorcreate-promise';
import BankAccount from './bankAccount';
import SocialProfile from './socialProfile';

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
<<<<<<< HEAD

    const socialProfile = await SocialProfile.create({
      interactions: 1237,
      dailyInteractions: 74
    });
    console.log(bankAccount);
    console.log(socialProfile);
    this.BankAccountId = bankAccount._id;

=======
    this.BankAccountId = bankAccount._id;
>>>>>>> 04301123cbe5c7e7a4ed9482b445d1460447780e
  }
  return next();
});


export const User = mongoose.model('User', UserSchema);
export default User;
