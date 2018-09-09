const {UserTC} = require('../composers');
import {TypeComposer} from 'graphql-compose';

export const UserQueries = TypeComposer.create('UserQueries');
export const UserMutations = TypeComposer.create('UserMutations');

UserQueries.addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userPagination: UserTC.getResolver('pagination'),
  userSignedIn: UserTC.getResolver('userSignedIn')
});

UserMutations.addFields({
  userCreate: UserTC.getResolver('createOne'),
  // userUpdateById: UserTC.getResolver('updateById'),
  // userUpdateOne: UserTC.getResolver('updateOne'),
  // userUpdateMany: UserTC.getResolver('updateMany'),
  // userRemoveById: UserTC.getResolver('removeById'),
  // userRemoveOne: UserTC.getResolver('removeOne'),
  // userRemoveMany: UserTC.getResolver('removeMany')

});





// import { UserTC } from '../composers';

// export const UserQueries = {
//   userById: UserTC.getResolver('findById'),
//   userByIds: UserTC.getResolver('findByIds'),
//   userOne: UserTC.getResolver('findOne'),
//   userMany: UserTC.getResolver('findMany'),
//   userCount: UserTC.getResolver('count'),
//   userConnection: UserTC.getResolver('connection'),
//   userPagination: UserTC.getResolver('pagination'),
// }

// export const UserMutations = {
//   userCreate: UserTC.getResolver('createOne'),
//   // userUpdateById: UserTC.getResolver('updateById'),
//   // userUpdateOne: UserTC.getResolver('updateOne'),
//   // userUpdateMany: UserTC.getResolver('updateMany'),
//   // userRemoveById: UserTC.getResolver('removeById'),
//   // userRemoveOne: UserTC.getResolver('removeOne'),
//   // userRemoveMany: UserTC.getResolver('removeMany'),
// }
