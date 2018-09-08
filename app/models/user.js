const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "The name that is publically displayed",
    index: true
  },
  handIds: {
    type: [{type: Types.ObjectId, ref: 'Hand'}],
    description: "The user hands across all games"
  },
}, { timestamps: true });

UserSchema.pre('save', async function(next)
{
  return next();
})

export const User = mongoose.model('User', UserSchema);
export default User;
