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
    type: int,
    required: true,
    description: "Max amount of money to put into savings account",
    index: true
  },
  socialIds: {
    type: [{
      type: Types.ObjectId,
      ref: 'GoogleUser',
    }],
    description: 'The ids of a users social profiles.',
  }
}, { timestamps: true });

UserSchema.pre('save', async function(next)
{
  return next();
})

export const User = mongoose.model('User', UserSchema);
export default User;
