import { CustomHelpers } from "joi";
const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for each route validation
module.exports = {
    create: Joi.object({
        student_id: Joi.string()
            .custom((value: string, helpers: CustomHelpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("Invalid student ID");
                }
                return value;
            })
            .required(),
        date: Joi.date().required(),
        time_started: Joi.date().required(),
        time_ended: Joi.date()
            .greater(Joi.ref("time_started"))
            .required()
            .messages({
                "date.greater": "time_ended must be later than time_started",
            }),
        time_total: Joi.number().positive().required().messages({
            "number.positive": "time_total must be a positive number",
        }),
        activity: Joi.string().required(),
        notes: Joi.string().required().allow(null, ""),
    }),

    update: Joi.object({
        student_id: Joi.string()
            .custom((value: string, helpers: CustomHelpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("Invalid student ID");
                }
                return value;
            })
            .required(),
        date: Joi.date().required(),
        time_started: Joi.date().required(),
        time_ended: Joi.date()
            .greater(Joi.ref("time_started"))
            .required()
            .messages({
                "date.greater": "time_ended must be later than time_started",
            }),
        time_total: Joi.number().positive().required().messages({
            "number.positive": "time_total must be a positive number",
        }),
        activity: Joi.string().required(),
        notes: Joi.string().required().allow(null, ""),
    }),

    delete: Joi.object({
        student_id: Joi.string()
            .custom((value: string, helpers: CustomHelpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("Invalid student ID");
                }
                return value;
            })
            .required(),
    }),

    findAll: Joi.object({}),

    findByStudentId: Joi.object({
        student_id: Joi.string()
            .custom((value: string, helpers: CustomHelpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("Invalid student ID");
                }
                return value;
            })
            .required(),
    }),
    findById: Joi.object({}),
};
