class ServiceResponse {
    constructor(status = null, data = null, friendlyErrorMessage = null, errorMessage = null) {
        this.status = status;
        this.data = data;
        this.friendlyErrorMessage = friendlyErrorMessage;
        this.errorMessage = errorMessage;
    }
}

module.exports = ServiceResponse