const enums = require("../utils/enums");

class BadRequest extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = enums.httpStatus.BadRequest;
    }
}

module.exports = BadRequest;
