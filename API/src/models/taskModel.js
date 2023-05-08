const mongoose = require('mongoose');
const enums = require('../utils/enums');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'user'
    },
    status: {
        type: String,
        default: enums.taskStatus.inProgress
    },
}, {
    timestamps: true
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
