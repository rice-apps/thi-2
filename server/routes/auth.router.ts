import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {authController} = require("../controllers");
const authValidation = require("../validations/auth.validation");
const jwtAuthen = require("../validations/jwtAuthentication");
// Template controller
router.post('/sign-up', wrapMiddleware(authValidation.signUp), wrapController(authController.signUp));

router.post('/sign-in', wrapMiddleware(authValidation.signIn), wrapController(authController.signIn));

router.post('/change-password', wrapMiddleware(authValidation.signIn), wrapController(authController.signIn));


module.exports = router;