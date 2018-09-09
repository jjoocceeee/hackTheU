import { SocialProfileQueriesTC, SocialProfileMutationsTC,
      BankAccountQueriesTC, BankAccountMutationsTC
  } from './schemas';

const {schemaComposer} = require('graphql-compose');

const {
  UserQueries,
  UserMutations
} = require('./schemas');

schemaComposer.rootQuery().addFields({
  user: {
    type: UserQueries.getType(),
    description: 'User information.',
    resolve: () => ({})
  },
  SocialProfile: {
    type: SocialProfileQueriesTC.getType(),
    description: 'Bank Information.',
    resolve: () => ({})
  },
  BankAccount: {
    type: BankAccountQueriesTC.getType(),
    description: 'Bank Information.',
    resolve: () => ({})
  }
});

schemaComposer.rootMutation().addFields({
  user: {
    type: UserMutations.getType(),
    description: 'User information.',
    resolve: () => ({})
  },
  SocialProfile: {
    type: SocialProfileMutationsTC.getType(),
    description: 'Bank Information.',
    resolve: () => ({})
  },
  BankAccount: {
    type: BankAccountMutationsTC.getType(),
    description: 'Bank Information.',
    resolve: () => ({})
  }

});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;

// import mongoose from 'mongoose';
// import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
// import { schemaComposer } from 'graphql-compose';

// import {
//   UserQueries,
//   UserMutations,
//   SocialProfileQueries,
//   SocialProfileMutations
// } from './schemas';

// schemaComposer.Query.addFields({
//   ...UserQueries,
//   ...SocialProfileQueries,
// });

// schemaComposer.Mutation.addFields({
//   ...UserMutations,
//   ...SocialProfileMutations,
// });

// const graphqlSchema = schemaComposer.buildSchema();
// export default graphqlSchema;
