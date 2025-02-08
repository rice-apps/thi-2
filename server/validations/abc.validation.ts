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
    getAllRecordsByAccount: Joi.object(), // No validation needed
    updateRecordById: Joi.object({
        student_id: Joi.string().required(),
        date: Joi.date().required,
        settings: Joi.string().required,
        antecedent: Joi.string().required,
        behavior: Joi.string().required,
        consequence: Joi.string().required,
        comments: Joi.string().required,
        id: Joi.string().required(),
    }),
    getRecordsByStaffId: Joi.object({
        id: Joi.string().required(),
    }),
    getRecordsByStudentId: Joi.object({
        id: Joi.string().required(),
    }),
    exportRecord: Joi.object({}),
    importRecord: Joi.object({}),
};
