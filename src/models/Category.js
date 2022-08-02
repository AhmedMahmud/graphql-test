const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { composeMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;

const ModelSchema = new Schema(
    {
        title: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.String,
            required: true,
        }
    },
    {
        collection: 'categories',
    }
);

ModelSchema.plugin(timestamps);
ModelSchema.set('toObject', { getters: true });

const Category = mongoose.model('Category', ModelSchema);

const CategoryTC = composeMongoose(Category, {});

module.exports = { CategoryTC, Category };
