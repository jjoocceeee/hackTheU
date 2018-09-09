import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { User } from '../models';
import { SocialProfileTC } from './SocialProfileTC';
import { BankAccountTC } from './BankAccountTC';


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


