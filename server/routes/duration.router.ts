import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {durationController} = require("../controllers");
const durationValidation = require("../validations/duration.validation");

router.post("/create", wrapMiddleware(durationValidation.create), wrapController(durationController.create));
router.put("/:student_id", wrapMiddleware(durationValidation.update), wrapController(durationController.update));
router.delete("/:student_id", wrapMiddleware(durationValidation.delete), wrapController(durationController.delete));
router.get("/all", wrapMiddleware(durationValidation.findAll), wrapController(durationController.findAll));
router.get("/:student_id", wrapMiddleware(durationValidation.findByStudentId, wrapController(durationValidation.findById)));

module.exports = router;