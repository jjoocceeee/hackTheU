// import { SocialProfileTC } from '../composers';

// export const SocialProfileQueries = {
//   socialProfileById: SocialProfileTC.getResolver('findById'),
//   socialProfileByIds: SocialProfileTC.getResolver('findByIds'),
//   socialProfileOne: SocialProfileTC.getResolver('findOne'),
//   socialProfileMany: SocialProfileTC.getResolver('findMany'),
//   socialProfileCount: SocialProfileTC.getResolver('count'),
//   socialProfileConnection: SocialProfileTC.getResolver('connection'),
//   socialProfilePagination: SocialProfileTC.getResolver('pagination'),
//   socialEngagementCount: SocialProfileTC.getResolver('facebookEngagements')
// }

// export const SocialProfileMutations = {
//   socialProfileCreate: SocialProfileTC.getResolver('createOne'),
//   // socialProfileUpdateById: SocialProfileTC.getResolver('updateById'),
//   // socialProfileUpdateOne: SocialProfileTC.getResolver('updateOne'),
//   // socialProfileUpdateMany: SocialProfileTC.getResolver('updateMany'),
//   // socialProfileRemoveById: SocialProfileTC.getResolver('removeById'),
//   // socialProfileRemoveOne: SocialProfileTC.getResolver('removeOne'),
//   // socialProfileRemoveMany: SocialProfileTC.getResolver('removeMany'),
// }

const {SocialProfileTC} = require('../composers');
import {TypeComposer} from 'graphql-compose';

export const SocialProfileQueriesTC = TypeComposer.create('SocialProfileQueries');
export const SocialProfileMutationsTC = TypeComposer.create('SocialProfileMutations');

SocialProfileQueriesTC.addFields({
  SocialProfileById: SocialProfileTC.getResolver('findById'),
  SocialProfileByIds: SocialProfileTC.getResolver('findByIds'),
  SocialProfileOne: SocialProfileTC.getResolver('findOne'),
  SocialProfileMany: SocialProfileTC.getResolver('findMany'),
  SocialProfileCount: SocialProfileTC.getResolver('count'),
  SocialProfilePagination: SocialProfileTC.getResolver('pagination')
});

SocialProfileMutationsTC.addFields({
  SocialProfileCreate: SocialProfileTC.getResolver('createOne'),
  // SocialProfileUpdateById: SocialProfileTC.getResolver('updateById'),
  // SocialProfileUpdateOne: SocialProfileTC.getResolver('updateOne'),
  // SocialProfileUpdateMany: SocialProfileTC.getResolver('updateMany'),
  // SocialProfileRemoveById: SocialProfileTC.getResolver('removeById'),
  // SocialProfileRemoveOne: SocialProfileTC.getResolver('removeOne'),
  // SocialProfileRemoveMany: SocialProfileTC.getResolver('removeMany')
  
});

