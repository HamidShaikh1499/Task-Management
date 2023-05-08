const enums = require("../utils/enums");

class ValidationError extends Error {
    constructor(message, validationError = null) {
        super();
        this.message = message;
        this.status = enums.httpStatus.UnprocessableEntity;
        this.validationError = validationError;
    }
}

module.exports = ValidationError;
