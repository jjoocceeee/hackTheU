const mongoose = require('mongoose');
import bcrypt from 'bcrypt-nodejs';
import findOrCreate from 'findorcreate-promise';

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
    type: String,
    description: "Max amount of money to put into savings account",
    default: 1000
  },
  BankAccount: {
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

// UserSchema.pre('save', async function(next)
// {
//   return next();
// });

// UserSchema.plugin(findOrCreate);

UserSchema.pre('save', async function(next)
{
  var user = this;
  // Copy the username field into the unique.
  user.username_unique = user.username;
    // only hash the password if it has been modified (or is new)
  if (user.isModified('password'))
  {
    // generate a salt & hash the password using our new salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  if (this.isNew)
  {
    const bankAccount = await BankAccount.create({
      checking: 500,
      savings: 0
    });
    this.bankingid = banking._id;
  }
  return next();
});





export const User = mongoose.model('User', UserSchema);
export default User;
