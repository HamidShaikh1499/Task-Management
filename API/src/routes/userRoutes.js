const constants = require('../utils/constants');

const router = require('express').Router();
const requestHandler = require('../errorHandler/requestHandler');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { updateUserById } = require('../validator/userValidator');

router.get(constants.routes.getUserDetail, authMiddleware, requestHandler(userController.getUserDetail));
router.put(constants.routes.getUserDetail, updateUserById, authMiddleware, requestHandler(userController.updateUserById));

module.exports = router;
