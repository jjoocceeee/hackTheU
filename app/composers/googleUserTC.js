
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { GoogleUser } from '../models';

import { GraphQLNonNull } from 'graphql';
import { GQC, TypeComposer, Resolver } from 'graphql-compose';
import { GraphQLGoogleId } from '../types/googleId';

const customizationOptions = {
  name: "GoogleUser",
  description: "A search query that is useful for analytics.",
	resolvers: {
		createOne: {
			record: {
				requiredFields: ['query'],
				removeFields: ['createdAt', 'updatedAt', '_id']
			},
		},
		updateById:
		{
			record: {
				removeFields: ['createdAt', 'updatedAt']
			}
		}
	}
};

export const GoogleUserTC = composeWithMongoose(GoogleUser, customizationOptions);
export default GoogleUserTC;
// ======================= Fields ==============================

GoogleUserTC.extendField('id', {
	type: GraphQLGoogleId
});

// ======================= Relations ==============================

// ======================= Resolvers ==============================

GoogleUserTC.getResolver('updateOne').getArgTC('filter').extendField('id', {
	type: GraphQLGoogleId
});

GoogleUserTC.addResolver(new Resolver({
  name: 'findByGoogleId',
	description: 'Find a google user with a google id.',
  type: GoogleUserTC.getResolver('findById').getType(), // or GraphQLOutputType
  args: {
    id: { type: new GraphQLNonNull(GraphQLGoogleId) },
  },
  resolve: async ({ source, args, context, info }) => {
    return await GoogleUser.findOne({id: args.id});
  }
}))
