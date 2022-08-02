const { AuthenticationError, ValidationError } = require('apollo-server');
const { GraphQLList } = require('graphql')
const { TaskTC, Task } = require('../../models/Task');
const { Category } = require('../../models/Category');

export const tasksByCategory = {
    type: [TaskTC],
    args: {
        category_id: 'MongoID!',
    },
    resolve: async (parent, args, context, info) => {
        try {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const category = await Category.findOne({ _id: args.category_id }).exec();

            if (!category) {
                throw new ValidationError('Category does not exist');
            } else {
                return await Task.find(
                    { category: args.category_id }
                ).exec();
            }
        } catch (e) {
            throw new Error(e);
        }
    },
};