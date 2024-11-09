import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Duration = require("../models/duration");
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");

class DurationController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const duration = new Duration(req.body);
            const savedDuration = await duration.save();

            return savedDuration;
        } catch (err: any) {
            throw err;
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.student_id;

        const newData = req.body;
    }

    async delete(req: Request, res: Response, next: NextFunction) {

    }

    async findAll(req: Request, res: Response, next: NextFunction) {

    }

    async findByStudentId(req: Request, res: Response, next: NextFunction) {

    }
}

module.exports = new DurationController();