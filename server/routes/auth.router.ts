import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { authController } = require("../controllers");
const authValidation = require("../validations/auth.validation");
// Sign Up Router
router.post(
  "/sign-up",
  wrapMiddleware(authValidation.signUp),
  wrapController(authController.signUp)
);
// Router for setting password
router.post(
  "/set-password",
  wrapMiddleware(authValidation.setPassword),
  wrapController(authController.setPassword)
);
//Router for signing in
router.post(
  "/sign-in",
  wrapMiddleware(authValidation.signIn),
  wrapController(authController.signIn)
);
//Router for deleting account
router.delete(
  "/drop-account",
  wrapMiddleware(authValidation.dropAccount),
  wrapController(authController.dropAccount)
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
//Router for getting user's info
router.post(
  "/info",
  wrapMiddleware(authValidation.info),
  wrapController(authController.info)
);
//Router for logging a user out
router.post(
  "/log-out",
  wrapMiddleware(authValidation.logOut),
  wrapController(authController.logOut)
);

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

module.exports = router;
