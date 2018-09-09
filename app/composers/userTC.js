import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { User } from '../models';
const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['username'],
        removeFields: ['_id', 'createdAt', 'updatedAt']
      },
    }
  }
};

export const UserTC = composeWithMongoose(User, customizationOptions);
export default UserTC;
