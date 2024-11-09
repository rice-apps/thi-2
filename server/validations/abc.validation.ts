import Joi from "joi"

module.exports = {
      create: Joi.object({
        staff: Joi.object().required,
        student_id: Joi.object().required,
        date: Joi.date().required,
        settings: Joi.string().required,
        antecedent: Joi.string().required,
        behavior: Joi.string().required,
        consequence: Joi.string().required,
        comments: Joi.string().required,
      })  
};