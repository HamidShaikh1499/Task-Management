const { validationResult } = require('express-validator');
const _ = require('lodash');

const ValidationError = require('../errorHandler/validationError');

const validateRequest = (req) => {
    const { errors } = validationResult(req);
    if (!_.isEmpty(errors)) {
        let formattedErrors = {};
        _.forEach(errors, ({ path, msg }) => {
            formattedErrors = {
                ...formattedErrors,
                [path]: _.isEmpty(formattedErrors[path]) ? [msg]
                    : _.includes(formattedErrors[path], msg) ? formattedErrors[path]
                        : [...formattedErrors[path], msg],
            };
        });

        throw new ValidationError('Validation Error', formattedErrors);
    }
};

module.exports = validateRequest;
