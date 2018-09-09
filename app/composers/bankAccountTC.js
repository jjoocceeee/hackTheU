import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { bankAccount } from '../models';
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

export const BankAccountTC = composeWithMongoose(BankAccount, customizationOptions);
export default BankAccountTC;

// BankAccountTC.addResolver(new Resolver({
//   name: 'facebookEngagements',
// 	description: 'bla',
//   type: {
//     total: Number
//   },
//   args: {
//     id: { type: new GraphQLNonNull(GraphQLGoogleId) },
//   },
//   resolve: async ({ source, args, context, info }) => {
//     var data = await FB.api("me/feed?fields=reactions.summary(true)");
//     console.log(data);
//     return null;
//   }
// }))