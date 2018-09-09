
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
  SocialProfilePagination: SocialProfileTC.getResolver('pagination'),
  SocialProfilefacebookEngagements: SocialProfileTC.getResolver('facebookEngagements')
});

SocialProfileMutationsTC.addFields({
  SocialProfileCreate: SocialProfileTC.getResolver('createOne'),
  // SocialProfileUpdateById: SocialProfileTC.getResolver('updateById'),
  // SocialProfileUpdateOne: SocialProfileTC.getResolver('updateOne'),
  // SocialProfileUpdateMany: SocialProfileTC.getResolver('updateMany'),
  // SocialProfileRemoveById: SocialProfileTC.getResolver('removeById'),
  // SocialProfileRemoveOne: SocialProfileTC.getResolver('removeOne'),
  // SocialProfileRemoveMany: SocialProfileTC.getResolver('removeMany')
  SocialProfileUpdateTotalInteractions: SocialProfileTC.getResolver('UpdateTotalInteractions'),
  
});

