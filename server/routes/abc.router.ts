import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {abcController} = require("../controllers");
const abcValidation = require("../validations/abc.validation");

router.post("/create", wrapMiddleware(abcValidation.create), wrapController(abcController.create))
router.post("/getRecords", wrapMiddleware(abcValidation.getAllRecordsByAccount), wrapController(abcValidation.getAllRecordsByAccount))
router.post("/:id", wrapMiddleware(abcValidation.getRecordByID), wrapController(abcValidation.getRecordByID))
router.put("/:id", wrapMiddleware(abcValidation.updateRecordById), wrapController(abcValidation.updateRecordById))
router.delete("/:id", wrapMiddleware(abcValidation.deleteRecordById), wrapController(abcValidation.deleteRecordById))
router.get("/export", wrapMiddleware(abcValidation.exportRecord), wrapController(abcValidation.exportRecord))
router.post("/import", wrapMiddleware(abcValidation.importRecord), wrapController(abcController.importRecord))
