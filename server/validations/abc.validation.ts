import Joi from "joi";

module.exports = {
    create: Joi.object({
        student_id: Joi.string().required(),
        date: Joi.date().required,
        settings: Joi.string().required,
        antecedent: Joi.string().required,
        behavior: Joi.string().required,
        consequence: Joi.string().required,
        comments: Joi.string().required,
    }),
    getAllRecordsByAccount: Joi.object({
        staff_id: Joi.string().required(),
    }),
    updateRecordById: Joi.object({
        staff_id: Joi.string().required(),
        student_id: Joi.string().required(),
        date: Joi.date().required,
        settings: Joi.string().required,
        antecedent: Joi.string().required,
        behavior: Joi.string().required,
        consequence: Joi.string().required,
        comments: Joi.string().required,
        id: Joi.string().required(),
    }),
    deleteRecordById: Joi.object({
        id: Joi.string().required(),
    }).unknown(true),
    getRecordByID: Joi.object({
        id: Joi.string().required(),
    }).unknown(true),
    exportRecord: Joi.object({}),
    importRecord: Joi.object({}),
};
