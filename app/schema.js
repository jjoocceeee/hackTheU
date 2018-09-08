import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { schemaComposer } from 'graphql-compose';

import {
  UserQueries,
  UserMutations,
} from './schemas';

schemaComposer.Query.addFields({
  ...UserQueries,
});

schemaComposer.Mutation.addFields({
  ...UserMutations,
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
