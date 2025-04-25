const AuthValidation = require("./auth.validation");
const AbcValidation = require("./abc.validation");
const jwtAuthen = require("./jwtAuthen");
const jwtAuthenStrategy = require("./jwtStrategy");
const AdminValidation = require("./admin.validation");
const StudentValidation = require("./student.validation");
const DurationValidation = require("./student.validation");

module.exports = {
    AuthValidation,
    AbcValidation,
    jwtAuthen,
    jwtAuthenStrategy,
    AdminValidation,
    StudentValidation,
    DurationValidation,
};
