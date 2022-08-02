const {
    generateQueries,
    generateMutations,
} = require('../functions/General/generateCrud');
const { createTask } = require('../functions/Tasks/createTask');
const {
    taskDetailsVerification,
} = require('../functions/Tasks/taskDetailsVerification');
const { assignCategory } = require('../functions/Tasks/assignCategory');
const { tasksByCategory } = require('../functions/Tasks/tasksByCategory');
const { TaskTC } = require('../models/Task');

const Query = {
    ...generateQueries({
        TC: TaskTC,
        name: 'task',
        get: { create: true, auth: true },
        list: { create: true, auth: false },
    }),
    tasksByCategory: tasksByCategory
};

const Mutation = {
    ...generateMutations({
        TC: TaskTC,
        name: 'task',
        edit: { create: true, auth: true },
        create: { create: false, auth: true },
    }),
    taskCreate: createTask,
    taskDetailsVerification: taskDetailsVerification,
    assignCategory: assignCategory,
};

module.exports = { Query, Mutation };
