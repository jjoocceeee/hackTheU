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
    return SocialProfileTC.findOne({_id:context.user.SocialProfile});
  }
}));


SocialProfileTC.addResolver(new Resolver({
  name: 'UpdateTotalInteractions',
	description: 'Add todays interaction to total interaction',
  resolve: async ({ source, args, context, info }) => {
    var Total = await context.fb.api("me/feed?fields=reactions.summary(true)", { access_token: process.env.FACEBOOK_ACCESS_TOKEN });
    var daily = await SocialProfile.findOne({_id:context.user.checking});
    SocialProfile.updateOn({_id:context.user.socialProfile,}, {$set:{
      interactions : Total + daily.dailyInteractions
    }});
    
    console.log(res.data[0].reactions);
    return SocialProfileTC.findOne({_id:context.user.SocialProfile});
  }
}));

// SocialProfileTC.addResolver(new Resolver({
//   name: 'FacebookFeed',
// 	description: 'The Entire Feed of the Facebook User',
//   resolve: async ({ source, args, context, info }) => {
//     var Total = await context.fb.api("me/feed", { access_token: process.env.FACEBOOK_ACCESS_TOKEN });
//     var daily = await SocialProfile.findOne({_id:context.user.checking});
//     SocialProfile.updateOn({_id:context.user.socialProfile,}, {$set:{
//       interactions : Total + daily.dailyInteractions
//     }});
    
//     console.log(res.data[0].reactions);
//     return null;
//   }
// }));


// resolve: async ({ source, args, context, info }) => {
//   var a = await BankAccount.findOne({_id:context.user.checking});
//   BankAccount.updateOne({_id:context.user.checking,}, {$set:{
//     checking : a.checking + args.amount
//   }});
//   console.log(args);
//   return null;
// },


