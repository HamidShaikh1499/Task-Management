const constants = require('../utils/constants');

const router = require('express').Router();
const requestHandler = require('../errorHandler/requestHandler');
const taskController = require('../controller/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { createTask, validTaskIdInParam, updateTaskById } = require('../validator/taskValidator');

router.get(constants.routes.task, authMiddleware, requestHandler(taskController.tasks));
router.get(constants.routes.completeTask, authMiddleware, validTaskIdInParam, requestHandler(taskController.completeTask));
router.get(constants.routes.undoneTask, authMiddleware, validTaskIdInParam, requestHandler(taskController.undoneTask));
router.post(constants.routes.task, authMiddleware, createTask, requestHandler(taskController.createTask));
router.put(constants.routes.task, authMiddleware, updateTaskById, requestHandler(taskController.updateTaskById));
router.delete(constants.routes.deleteTask, authMiddleware, validTaskIdInParam, requestHandler(taskController.deleteTaskById));

module.exports = router;
