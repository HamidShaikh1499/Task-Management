const enums = {
    taskStatus: {
        inProgress: 'InProgress',
        completed: 'Completed'
    },
    httpStatus: {
        Ok: 200,
        BadRequest: 400,
        Unauthorized: 401,
        UnprocessableEntity: 422,
        InternalServer: 500
    }
};

module.exports = enums;
