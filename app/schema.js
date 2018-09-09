import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { schemaComposer } from 'graphql-compose';

import {
  UserQueries,
  UserMutations,
  SocialProfileQueries,
  SocialProfileMutations
} from './schemas';

schemaComposer.Query.addFields({
  ...UserQueries,
  ...SocialProfileQueries,
});

schemaComposer.Mutation.addFields({
  ...UserMutations,
  ...SocialProfileMutations,
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
