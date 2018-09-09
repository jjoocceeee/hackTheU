import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { SocialProfile } from '../models';
import { GQC, TypeComposer, InputTypeComposer, Resolver } from 'graphql-compose';
import { GraphQLNonNull } from 'graphql';

const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: [],
        removeFields: ['_id', 'createdAt', 'updatedAt']
      },
    }
  }
};

export const SocialProfileTC = composeWithMongoose(SocialProfile, customizationOptions);
export default SocialProfileTC;

SocialProfileTC.addResolver(new Resolver({
  name: 'facebookEngagements',
	description: 'bla',
  resolve: async ({ source, args, context, info }) => {
    var res = await context.fb.api("me/feed?fields=reactions.summary(true)", { access_token: process.env.FACEBOOK_ACCESS_TOKEN });
    console.log(res.data[0].reactions);
    return null;
  }
}))
