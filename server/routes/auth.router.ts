import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { authController } = require("../controllers");
const authValidation = require("../validations/auth.validation");
// Template controller
router.post(
  "/sign-up",
  wrapMiddleware(authValidation.signUp),
  wrapController(authController.signUp)
);
//router.post("/set-password", wrapMiddleware(authValida));
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
