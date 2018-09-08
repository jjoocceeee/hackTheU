import mongoose from 'mongoose';
import findOrCreate from 'findorcreate-promise';
import path from 'path';
import _ from 'lodash';

var GoogleUserSchema = new mongoose.Schema(
{
	id:
	{
		type: String,
		required: true,
		index: true,
		unique: true,
		description: "The google id of the user."
	},
	emails:
	{
		type: [new mongoose.Schema({
      email: {
        type: String,
        index: true
      },
      type: {
        type: String
      }
    })],
		index: true,
		required: true
	},
	displayName:
  {
    type: String,
    description: 'The display name on Google for the user.'
  },
	image: new mongoose.Schema({
		url: {
			type: String
		},
		isDefault: {
			type: Boolean
		}
	}),
	aboutMe:
	{
		type: String,
		description: 'A short biography for this person.'
	},
	gender:
	{
		type: String,
		index: true,
		description: 'The person\'s gender.'
	},
	isPlusUser:
	{
		type: Boolean,
		description: 'Whether the user is a Google Plus user.'
	},
	url:
	{
		type: mongoose.Schema.Types.Url,
		description: 'The URL of this person\'s profile.'
	},
	language:
	{
		type: String,
		description: 'The user\'s language.',
		index: true
	},
	verified:
	{
		type: Boolean,
		description: 'Whether the person or Google+ Page has been verified.'
	}
},
{
  timestamps: true
});
GoogleUserSchema.plugin(findOrCreate);

GoogleUserSchema.index({"createdAt": 1});

GoogleUserSchema.pre('save', async function(next) {
  if(!this.isNew) return next();
  return next();
});

GoogleUserSchema.pre('remove', async function(next) {
  return next();
});

export const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);
