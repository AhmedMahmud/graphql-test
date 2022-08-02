const { AuthenticationError, ValidationError } = require('apollo-server');
const { TaskTC, Task } = require('../../models/Task');
const { Category } = require('../../models/Category');

export const assignCategory = {
    type: TaskTC,
    args: {
        task_id: 'MongoID!',
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
                return await Task.findOneAndUpdate(
                    { _id: args.task_id },
                    {
                        $set: {
                            category: category._id,
                        },
                    },
                    { new: true }
                );
            }
        } catch (e) {
            throw new Error(e);
        }
    },
};