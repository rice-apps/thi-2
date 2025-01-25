import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("@/helper");
const { adminController } = require("@/controllers");
const adminValidation = require("@/validations/admin.validation");
const jwtAuthen = require("@/validations/jwtAuthen");

router.post("/whitelist", jwtAuthen, wrapMiddleware(adminValidation.whitelist), wrapController(adminController.whitelist));
router.post("/delete", jwtAuthen, wrapMiddleware(adminValidation.delete), wrapController(adminController.delete));
router.get("/", jwtAuthen, wrapController(adminController.findAll));

module.exports = router;