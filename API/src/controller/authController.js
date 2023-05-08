require('dotenv').config();

const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const ServiceResponse = require('../models/serviceResponse');
const ValidationError = require('../errorHandler/validationError');
const jwt = require('jsonwebtoken');
const enums = require('../utils/enums');
const BadRequest = require('../errorHandler/BadRequest');
const { omit, toNumber } = require('lodash');
const validateRequest = require('../validator/requestValidator');

class AuthController {
    registerUser = async (req, res) => {
        validateRequest(req);
        const userDetail = req.body;

        // find user with given email to email validation for unique
        const existUser = await userModel.findOne({ email: userDetail.email }).lean().exec();
        if (existUser) {
            throw new ValidationError('email', {
                email: ['Email address is already exist. Please use another email address.'],
            });
        }

        userDetail.password = await bcrypt.hash(userDetail.password, 10);
        const user = new userModel(userDetail);
        await user.save();

        return res.send(new ServiceResponse(enums.httpStatus.Ok, { isRegistered: true }));
    }

    login = async (req, res) => {
        validateRequest(req);
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).lean().exec();
        if (!user) {
            throw new BadRequest('User is not found.');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new ValidationError('password', {
                password: ['Please enter valid password.'],
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: toNumber(process.env.TOKEN_EXPIRE_TIME), audience: process.env.AUDIENCE, issuer: process.env.ISSUER },
        );

        return res.send(new ServiceResponse(
            enums.httpStatus.Ok,
            {
                token,
                user: omit(user, ['createdAt', 'updatedAt', '__v', 'password']),
            }
        ));
    }
}

module.exports = new AuthController();
