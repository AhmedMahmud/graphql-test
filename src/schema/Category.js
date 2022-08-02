const {
    generateQueries,
    generateMutations,
} = require('../functions/General/generateCrud');
const { CategoryTC } = require('../models/Category');
const { authMiddleware } = require('../utils/auth');

const Query = {
    ...generateQueries({
        TC: CategoryTC,
        name: 'category',
        get: { create: true, auth: true },
        list: { create: true, auth: true },
    }),
};

const Mutation = {
    ...generateMutations({
        TC: CategoryTC,
        name: 'category',
        edit: { create: true, auth: true },
        create: { create: true, auth: true },
    }),
    "categoryDelete": CategoryTC.mongooseResolvers
        .removeOne()
        .withMiddlewares([authMiddleware]),
};

module.exports = { Query, Mutation };
