import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { adminController } = require("../controllers");
const { AdminValidation, jwtAuthen } = require("../validations");

router.post(
    "/whitelist",
    jwtAuthen,
    wrapMiddleware(AdminValidation.whitelist),
    wrapController(adminController.whitelist)
);
router.delete(
    "/delete",
    jwtAuthen,
    wrapMiddleware(AdminValidation.delete),
    wrapController(adminController.delete)
);
router.get(
    "/findAllAbc",
    jwtAuthen,
    wrapController(adminController.findAllAbc)
);
router.get(
    "/findAllDuration",
    jwtAuthen,
    wrapController(adminController.findAllDuration)
);

module.exports = router;
