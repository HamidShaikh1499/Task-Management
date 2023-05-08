const NotFoundError = require('./notFoundError');

const pageNotFound = (req, res, next) => {
    const { url } = req;
    throw new NotFoundError(`Page not found at '${url}'`);
};

module.exports = pageNotFound;