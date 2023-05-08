class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message ?? 'Page not found';
        this.status = 403
    }
}

module.exports = NotFoundError;