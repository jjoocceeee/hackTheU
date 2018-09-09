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
  }
});

schemaComposer.rootMutation().addFields({
  user: {
    type: UserMutations.getType(),
    description: 'User information.',
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
