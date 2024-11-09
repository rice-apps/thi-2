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
        try {
            const studentId = req.params.student_id;
            const newData = req.body;
            const updatedDuration = await Duration.findOneAndUpdate(
                { student_id: studentId },
                newData
            );

            if (!updatedDuration) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${studentId} not found.`
                })
            }

            return updatedDuration;
        } catch (err: any) {
            throw err;
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const studentId = req.params.student_id;
            
            if (!mongoose.Types.ObjectId.isValid(studentId)) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                    message: `Invalid studentId format: ${studentId}.`
                });
            }

            const deletedDuration = await Duration.findOneAndDelete({ student_id: studentId });

            if (!deletedDuration) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${studentId} not found.`,
                });
            }

            return deletedDuration;
        } catch (err: any) {

        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {

    }

    async findByStudentId(req: Request, res: Response, next: NextFunction) {

    }
}

module.exports = new DurationController();