const constants = {
    routes: {
        // auth routes
        registerUser: '/register',
        login: '/login',

        // user routes
        getUserDetail: '/',

        // task routes
        task: '/',
        deleteTask: '/remove/:_id',
        completeTask: '/complete/:_id',
        undoneTask: '/undone/:_id',
    }
};

module.exports = constants;
