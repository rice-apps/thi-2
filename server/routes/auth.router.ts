import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { authController } = require("../controllers");
const { jwtAuthen, AuthValidation } = require("../validations");

/**
 * Set password (POST)
Sign in (POST)
--Restricted access route for sessions (use jwt token and passport.js) --
Change password (PUT)
Forgot password (POST)
Update info (POST)
Info (POST)
Log out (POST)
Remove account (DELETE)
 */

// Template controller
router.post(
  "/create-user",
  wrapMiddleware(AuthValidation.createUser),
  wrapController(authController.createUser)
);
router.post(
  "/sign-up",
  wrapMiddleware(AuthValidation.signUp),
  wrapController(authController.signUp)
);
//Router for forgetting password (setting a new password)
router.post(
  "/set-password",
  jwtAuthen,
  wrapMiddleware(AuthValidation.setPassword),
  wrapController(authController.setPassword)
);
router.post(
  "/sign-in",
  wrapMiddleware(AuthValidation.signIn),
  wrapController(authController.signIn)
);

//Router for changing password (change for a new password)
router.post(
  "/change-password",
  jwtAuthen,
  wrapMiddleware(AuthValidation.changePassword),
  wrapController(authController.changePassword)
);
//Router for forgetting password (setting a new password)
router.post(
  "/forget-password",

  wrapMiddleware(AuthValidation.forgetPassword),
  wrapController(authController.forgetPassword)
);
//Router for updating info
router.post(
  "/update-info",
  jwtAuthen,
  wrapMiddleware(AuthValidation.updateInfo),
  wrapController(authController.updateInfo)
);
//Router for getting user's info
router.get(
  "/info",
  jwtAuthen,
  wrapMiddleware(AuthValidation.info),
  wrapController(authController.info)
);
//Router for helper function to getting user's all info in database
router.get(
  "/all-info",

  wrapMiddleware(AuthValidation.info),
  wrapController(authController.getUserInfo)
);
module.exports = router;
