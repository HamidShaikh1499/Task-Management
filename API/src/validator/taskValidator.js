const { body, param } = require('express-validator');

const createTask = [
    body('title')
        .exists()
        .withMessage('Please enter title.')
        .notEmpty()
        .withMessage('Please enter title.'),
    body('description')
        .exists()
        .withMessage('Please enter description.')
        .notEmpty()
        .withMessage('Please enter description.'),
    body('dueDate')
        .exists()
        .withMessage('Please enter due date.')
        .isISO8601()
        .withMessage('Please enter valid due date.'),
];

const updateTaskById = [
    body('title')
        .exists()
        .withMessage('Please enter title.')
        .notEmpty()
        .withMessage('Please enter title.'),
    body('description')
        .exists()
        .withMessage('Please enter description.')
        .notEmpty()
        .withMessage('Please enter description.'),
    body('dueDate')
        .exists()
        .withMessage('Please enter due date.')
        .isISO8601()
        .withMessage('Please enter valid due date.'),
    body('_id')
        .exists()
        .withMessage('Please enter task id.')
        .notEmpty()
        .withMessage('Please enter task id.')
        .isMongoId()
        .withMessage('Please enter valid task id.'),
];

const validTaskIdInParam = [
    param('_id')
        .isMongoId()
        .withMessage('Please enter valid task id.')
];

module.exports = {
    createTask,
    updateTaskById,
    validTaskIdInParam
};
