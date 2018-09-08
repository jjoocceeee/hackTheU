const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;
const SocialProfileSchema = new mongoose.Schema({
  interactions: {
    type: Number,
    description: "The total number of interactions with a users' posts.",
    index: true
  },
}, { timestamps: true });


export const SocialProfile = mongoose.model('SocialProfile', SocialProfileSchema);
export default SocialProfile;
