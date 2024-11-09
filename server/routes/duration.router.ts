import express from "express";
const router = express.Router();
const { wrapMiddleware, wrapController } = require("../helper");
const { durationController } = require("../controllers");
const durationValidation = require("../validations/duration.validation");

router.post(
    "/create",
    wrapMiddleware(durationValidation.create),
    wrapController(durationController.create)
);
router.put(
    "/:student_id",
    wrapMiddleware(durationValidation.update),
    wrapController(durationController.update)
);
router.delete(
    "/:student_id",
    wrapMiddleware(durationValidation.delete),
    wrapController(durationController.delete)
);
router.get(
    "/all",
    wrapMiddleware(durationValidation.findAll),
    wrapController(durationController.findAll)
);
router.get(
    "/staff/:staff_id",
    wrapMiddleware(durationValidation.findByStaffId),
    wrapController(durationController.findByStaffId)
);
router.get(
    "/:student_id",
    wrapMiddleware(durationValidation.findById),
    wrapController(durationController.findByStudentId)
);

module.exports = router;
