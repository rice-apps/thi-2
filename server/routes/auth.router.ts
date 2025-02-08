import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { authController } = require("../controllers");
const authValidation = require("../validations/auth.validation");

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
const { jwtAuthen } = require("../validations");

// Template controller
router.post(
  "/create-user",
  wrapMiddleware(authValidation.createUser),
  wrapController(authController.createUser)
);
router.post(
  "/sign-up",
  wrapMiddleware(authValidation.signUp),
  wrapController(authController.signUp)
);

router.post(
  "/sign-in",
  wrapMiddleware(authValidation.signIn),
  wrapController(authController.signIn)
);

//Router for getting user's info
router.post(
  "/info",
  wrapMiddleware(authValidation.info),
  wrapController(authController.info)
);

//Router for changing password (change for a new password)
router.put(
  "/change-password",
  wrapMiddleware(authValidation.changePassword),
  wrapController(authController.changePassword)
);
//Router for forgetting password (setting a new password)
router.post(
  "/set-password",
  wrapMiddleware(authValidation.forgetPassword),
  wrapController(authController.forgetPassword)
);
//Router for updating info
router.post(
  "/update-info",
  wrapMiddleware(authValidation.updateInfo),
  wrapController(authController.updateInfo)
);

module.exports = router;
