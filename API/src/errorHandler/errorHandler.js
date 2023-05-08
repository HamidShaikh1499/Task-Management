const ServiceResponse = require('../models/serviceResponse')

const errorHandler = (err, req, res, next) => {
    let { status = 500, message, validationError } = err;
    console.log(err);
    // If status code is 500 - change the message to Internal server error.
    message = status === 500 || !message ? 'Internal server error' : message;

    const serviceResponse = new ServiceResponse(status, null, message, validationError)
    res.send(serviceResponse);
};

module.exports = errorHandler;