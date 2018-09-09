import { SocialProfileTC } from '../composers';

export const SocialProfileQueries = {
  socialProfileById: SocialProfileTC.getResolver('findById'),
  socialProfileByIds: SocialProfileTC.getResolver('findByIds'),
  socialProfileOne: SocialProfileTC.getResolver('findOne'),
  socialProfileMany: SocialProfileTC.getResolver('findMany'),
  socialProfileCount: SocialProfileTC.getResolver('count'),
  socialProfileConnection: SocialProfileTC.getResolver('connection'),
  socialProfilePagination: SocialProfileTC.getResolver('pagination'),
  socialEngagementCount: SocialProfileTC.getResolver('facebookEngagements')
}

export const SocialProfileMutations = {
  socialProfileCreate: SocialProfileTC.getResolver('createOne'),
  // socialProfileUpdateById: SocialProfileTC.getResolver('updateById'),
  // socialProfileUpdateOne: SocialProfileTC.getResolver('updateOne'),
  // socialProfileUpdateMany: SocialProfileTC.getResolver('updateMany'),
  // socialProfileRemoveById: SocialProfileTC.getResolver('removeById'),
  // socialProfileRemoveOne: SocialProfileTC.getResolver('removeOne'),
  // socialProfileRemoveMany: SocialProfileTC.getResolver('removeMany'),
}
