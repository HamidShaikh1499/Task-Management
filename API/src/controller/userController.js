const ServiceResponse = require("../models/serviceResponse");
const userModel = require("../models/userModel");
const Enums = require("../utils/enums");
const ValidationError = require("../errorHandler/validationError");
const validateRequest = require("../validator/requestValidator");

class UserController {
    getUserDetail = async (req, res) => {
        validateRequest(req);
        const { id } = req.user;

        const user = await userModel.findById(id).select({ password: 0, __v: 0 }).lean().exec();
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            user,
        ));
    }

    updateUserById = async (req, res) => {
        const userDetail = req.body;

        const existUser = await userModel.findOne({ email: userDetail.email, _id: { $ne: userDetail.id } }).lean().exec();
        if (existUser) {
            throw new ValidationError('email', {
                email: ['Email address is already exist. Please use another email address.'],
            });
        }

        const user = await userModel.findOneAndUpdate({ _id: userDetail.id }, userDetail, { new: true }).select({ password: 0 }).lean();
        return res.send(new ServiceResponse(
            Enums.httpStatus.Ok,
            user,
        ));
    }
}

module.exports = new UserController();
