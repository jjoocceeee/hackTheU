import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { GQC, TypeComposer, InputTypeComposer, Resolver } from 'graphql-compose';
import { BankAccount } from '../models';
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



BankAccountTC.addResolver(new Resolver({
  name: 'bankAccountTransfer',
	description: 'Will transfer .10 for every like.',
  resolve: async ({ source, args, context, info }) => {
    console.log(args);
    return null;
  }
}))

// bankAccountTC.addResolver(new Resolver({
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