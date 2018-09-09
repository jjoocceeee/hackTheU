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
  name: 'updateChecking',
  description: 'Will update Checking account.',  
  args: {
    amount: 'Int!',
  },
  type: BankAccountTC,
  resolve: async ({ source, args, context, info }) => {
    var a = await BankAccount.findOne({_id:context.user.checking});
    BankAccount.updateOne({_id:context.user.checking,}, {$set:{
      checking : a.checking + args.amount
    }});
    console.log(args);
    return null;
  },
}));

BankAccountTC.addResolver(new Resolver({
  name: 'updateSavings',
  description: 'Will update Saving account.',
  args:{
    amount: 'Int!'
  },
  resolve: async ({ source, args, context, info }) => {
    var a = await BankAccount.findOne({_id:context.user.saving});
    BankAccount.updateOne({_id:context.user.saving,}, {$set:{
      checking : a.saving + args.amount
    }});
    console.log(args);
    return BankAccount.findOne({_id:context.user.saving});
  }
}));

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