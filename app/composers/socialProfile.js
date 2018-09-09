import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { SocialProfile } from '../models';
const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['username'],
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
  type: {
    total: Number
  },
  args: {
    id: { type: new GraphQLNonNull(GraphQLGoogleId) },
  },
  resolve: async ({ source, args, context, info }) => {
    var data = await FB.api("me/feed?fields=reactions.summary(true)");
    console.log(data);
    return null;
  }
}))
