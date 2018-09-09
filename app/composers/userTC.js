import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { User } from '../models';
import { SocialProfileTC } from './SocialProfileTC';
import { BankAccountTC } from './BankAccountTC';
import { GQC, TypeComposer, Resolver } from 'graphql-compose';


const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['username', 'maxSavings'],
        removeFields: ['_id', 'createdAt', 'updatedAt']
      },
    }
  }
};
export const UserTC = composeWithMongoose(User, customizationOptions);
export default UserTC;


UserTC.addRelation('BankAccount', {
  resolver: () => BankAccountTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.bankAccountId,
  },
  projection: { BankAccountIds: true },
});

UserTC.addRelation('SocialProfile', {
  resolver: () => SocialProfileTC.getResolver('findById'),
  prepareArgs: {
    _id: (sourc) =>source.socialProfileId,
  },
  projection: {SocialProfileId: true},
});


// ======================= Resolvers ==============================

UserTC.addResolver(new Resolver({
  name: 'userSignedIn',
	description: 'Returns the user that is signed in, else null.',
  type: UserTC, // or GraphQLOutputType
  resolve: async ({ source, args, context, info }) => {
    return context.user;
  }
}))
