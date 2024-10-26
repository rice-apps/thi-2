import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {authController} = require("../controllers");
const authValidation = require("../validations/auth.validation");
// Template controller
router.post('/sign-up', wrapMiddleware(authValidation.signUp), wrapController(authController.signUp));

module.exports = router;