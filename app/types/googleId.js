import _ from 'lodash';

import { GraphQLInterfaceType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { Factory } from 'graphql-custom-types';

const factory = new Factory();

export const GraphQLGoogleId = factory.getRegexScalar({
    name: 'GoogleId',
    regex: /^\d+$/i,
    description: 'A google profile id.',
    error: 'Query error: Not a valid GoogleId'
});
