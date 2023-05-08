require('dotenv').config()
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const ServiceResponse = require('../models/serviceResponse');
const Enums = require('../utils/enums');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    const serviceResponse = new ServiceResponse();
    if (!token) {
        serviceResponse.status = Enums.httpStatus.Unauthorized;
        serviceResponse.friendlyErrorMessage = 'Access Denied';
        return res.send(serviceResponse);
    }

    const bearer = 'Bearer ';
    const accessToken = _.replace(token, bearer, '');

    try {
        const data = jwt.verify(accessToken, process.env.JWT_SECRET, { audience: process.env.AUDIENCE, issuer: process.env.ISSUER });
        req.user = data;
        return next();
    } catch (err) {
        serviceResponse.status = Enums.httpStatus.Unauthorized;
        serviceResponse.friendlyErrorMessage = 'Token expired.';
        return res.send(serviceResponse);
    }
}

module.exports = authMiddleware;
