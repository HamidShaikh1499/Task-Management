const constants = require('../utils/constants');

const router = require('express').Router();
const { registerUser, login } = require('../validator/userValidator');
const requestHandler = require('../errorHandler/requestHandler');
const authController = require('../controller/authController');

router.post(constants.routes.registerUser, registerUser, requestHandler(authController.registerUser));
router.post(constants.routes.login, login, requestHandler(authController.login));

module.exports = router;
