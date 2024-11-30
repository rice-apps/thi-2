import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("@/helper");
const { adminController } = require("@/controllers");
const adminValidation = require("@/validations/admin.validation");
const jwtAuthen = require("@/validations/jwtAuthen");

// Whitelist email (POST) - Generate new Account entry send email and temp password using Resend
router.post("/whitelist", jwtAuthen, wrapMiddleware(adminValidation.whitelist), wrapController(adminController.whitelist));
// Delete account (POST) - Delete account from database by user's email
router.post("/delete", jwtAuthen, wrapMiddleware(adminValidation.delete), wrapController(adminController.delete));
// Get all record (GET) - Get all records in AbcSchema
router.get("/:email", jwtAuthen, wrapMiddleware(adminValidation.findById), wrapController(adminController.findById));

module.exports = router;