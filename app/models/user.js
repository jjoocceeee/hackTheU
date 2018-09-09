const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
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
    required: true,
    description: "Max amount of money to put into savings account",
    index: true
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
