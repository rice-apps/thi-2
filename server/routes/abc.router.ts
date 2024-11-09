import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {abcController} = require("../controllers");
const abcValidation = require("../validations/abc.validation");

router.post("/create", wrapMiddleware(abcValidation.create), wrapController(abcController.create))