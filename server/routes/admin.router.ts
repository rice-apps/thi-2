import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("@/helper");
const { adminController } = require("@/controllers");
const adminValidation = require("@/validations/admin.validation");
const jwtAuthen = require("@/validations/jwtAuthen");

router.post("/whitelist", jwtAuthen, wrapMiddleware(adminValidation.whitelist), wrapController(adminController.whitelist));
router.post("/delete", jwtAuthen, wrapMiddleware(adminValidation.delete), wrapController(adminController.delete));
router.get("/findAllAbc", jwtAuthen, wrapController(adminController.findAllAbc));
router.get("/findAllDuration", jwtAuthen, wrapController(adminController.findAllDuration));

module.exports = router;