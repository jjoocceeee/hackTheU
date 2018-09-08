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
    type: Schema.Types.ObjectId,
    ref: 'GoogleUser',
    description: 'The id of the google user in the database.',
    index: true
  },
  socialIds: {
    type: [{
      type: Schema.Types.ObjectId,
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
