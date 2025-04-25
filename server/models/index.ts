const AccountModel = require("./accountModel");
const DurationModel = require("./duration");
const abcModel = require("./abc");
const StudentModel = require("./student");

module.exports = {
  Account: AccountModel,
  Duration: DurationModel,
  ABC: abcModel,
  Student: StudentModel
};
