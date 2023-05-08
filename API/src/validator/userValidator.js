const { body } = require('express-validator');

const userCommonValidation = {
    email: body('email')
        .exists()
        .withMessage('Please enter email.')
        .notEmpty()
        .withMessage('Please enter email.')
        .isEmail()
        .withMessage('Please enter valid email.'),
    password: body('password')
        .exists()
        .withMessage('Please enter password.')
        .notEmpty()
        .withMessage('Please enter password.')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be contains at least 8 characters.'),
    firstName: body('firstName')
        .exists()
        .withMessage('Please enter first name.')
        .notEmpty()
        .withMessage('Please enter first name.'),
    lastName: body('lastName')
        .exists()
        .withMessage('Please enter last name.')
        .notEmpty()
        .withMessage('Please enter last name.'),
}

const registerUser = [
    userCommonValidation.firstName,
    userCommonValidation.lastName,
    userCommonValidation.email,
    userCommonValidation.password
];

const login = [
    userCommonValidation.email,
    userCommonValidation.password
];

const updateUserById = [
    body('id')
        .notEmpty()
        .withMessage('Please enter id.')
        .isMongoId()
        .withMessage('Please enter valid id.'),
    userCommonValidation.firstName,
    userCommonValidation.lastName,
    userCommonValidation.email,
];

module.exports = {
    registerUser,
    login,
    updateUserById
}
