const authController = require("./auth.controller");
const durationController = require("./duration.controller");
const abcController = require("./abc.controller");
const studentController = require("./student.controller");
const adminController = require("./admin.controller");

module.exports = {
    authController,
    studentController,
    durationController,
    adminController,
    abcController,
};
