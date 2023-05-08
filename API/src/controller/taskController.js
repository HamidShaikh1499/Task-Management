const ServiceResponse = require("../models/serviceResponse");
const taskModel = require("../models/taskModel");
const Enums = require("../utils/enums");
const validateRequest = require("../validator/requestValidator");

class TaskController {
    createTask = async (req, res) => {
        validateRequest(req);
        const { id } = req.user;

        const taskDetail = req.body;
        const task = await new taskModel({ ...taskDetail, userId: id }).save();
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            task,
        ));
    }

    updateTaskById = async (req, res) => {
        validateRequest(req);
        const taskDetail = req.body;

        const task = await taskModel.findOneAndUpdate({ _id: taskDetail._id }, taskDetail, { new: true }).lean().exec();
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            task,
        ));
    }

    // we can make pagination api but task of any will be limited may be 10 or 100 
    // that's why i created simple.
    tasks = async (req, res) => {
        const { id } = req.user;
        const tasks = await taskModel.find({ userId: id }).sort({ title: 1 }).lean().exec();
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            tasks,
        ));
    }

    completeTask = async (req, res) => {
        validateRequest(req);
        const { _id } = req.params;
        const task = await taskModel.findOneAndUpdate({ _id }, { status: Enums.taskStatus.completed }, { new: true });
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            task,
        ));
    }

    undoneTask = async (req, res) => {
        validateRequest(req);
        const { _id } = req.params;
        const task = await taskModel.findOneAndUpdate({ _id }, { status: Enums.taskStatus.inProgress }, { new: true });
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            task,
        ));
    }

    // it is not sensitive information so can be deleted
    // if it is then we update record means we set isDeleted as true instead of deleting record. 
    deleteTaskById = async (req, res) => {
        validateRequest(req);
        const { _id } = req.params;
        await taskModel.findByIdAndDelete(_id);
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            {
                isDeleted: true,
            },
        ));
    }
}

module.exports = new TaskController();
