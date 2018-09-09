import { BankAccountTC } from '../composers';

// export const BankAccountQueries = {
//   BankAccountById: BankAccountTC.getResolver('findById'),
//   BankAccountByIds: BankAccountTC.getResolver('findByIds'),
//   BankAccountOne: BankAccountTC.getResolver('findOne'),
//   BankAccountMany: BankAccountTC.getResolver('findMany'),
//   BankAccountCount: BankAccountTC.getResolver('count'),
//   BankAccountConnection: BankAccountTC.getResolver('connection'),
//   BankAccountPagination: BankAccountTC.getResolver('pagination')
// }

// export const BankAccountMutations = {
//   BankAccountCreate: BankAccountTC.getResolver('createOne'),
//   // BankAccountUpdateById: BankAccountTC.getResolver('updateById'),
//   // BankAccountUpdateOne: BankAccountTC.getResolver('updateOne'),
//   // BankAccountUpdateMany: BankAccountTC.getResolver('updateMany'),
//   // BankAccountRemoveById: BankAccountTC.getResolver('removeById'),
//   // BankAccountRemoveOne: BankAccountTC.getResolver('removeOne'),
//   // BankAccountRemoveMany: BankAccountTC.getResolver('removeMany'),
//   BankAccountTransfer : BankAccountTC.getResolver('bankAccountTransfer')
// }



import {TypeComposer} from 'graphql-compose';

export const BankAccountQueriesTC = TypeComposer.create('BankAccountQueries');
export const BankAccountMutationsTC = TypeComposer.create('BankAccountMutations');

BankAccountQueriesTC.addFields({
  BankAccountById: BankAccountTC.getResolver('findById'),
  BankAccountByIds: BankAccountTC.getResolver('findByIds'),
  BankAccountOne: BankAccountTC.getResolver('findOne'),
  BankAccountMany: BankAccountTC.getResolver('findMany'),
  BankAccountCount: BankAccountTC.getResolver('count'),
  BankAccountPagination: BankAccountTC.getResolver('pagination')
});

BankAccountMutationsTC.addFields({
  BankAccountCreate: BankAccountTC.getResolver('createOne'),
  // BankAccountUpdateById: BankAccountTC.getResolver('updateById'),
  // BankAccountUpdateOne: BankAccountTC.getResolver('updateOne'),
  // BankAccountUpdateMany: BankAccountTC.getResolver('updateMany'),
  // BankAccountRemoveById: BankAccountTC.getResolver('removeById'),
  // BankAccountRemoveOne: BankAccountTC.getResolver('removeOne'),
  // BankAccountRemoveMany: BankAccountTC.getResolver('removeMany')
  BankAccountUpdateChecking: BankAccountTC.getResolver('updateChecking'),
  BankAccountUpdateSavings: BankAccountTC.getResolver('updateSavings')

});
