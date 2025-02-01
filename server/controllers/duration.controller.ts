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

            return savedDuration._doc;
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

            return updatedDuration._doc;
        } catch (err: any) {
            throw err;
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const studentId = req.params.student_id;
            
            const deletedDuration = await Duration.findOneAndDelete({ student_id: studentId });

            if (!deletedDuration) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${studentId} not found.`,
                });
            }

            return deletedDuration._doc;
        } catch (err: any) {
            throw err;
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await Duration.findAll();

            if (!students) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Students not found.`
                });
            }

            return students._doc;
        } catch (err) {
            throw err;
        }
    }

    async findByStudentId(req: Request, res: Response, next: NextFunction) {
        try {
            const studentId = req.params.student_id;
            
            const student = await Duration.findOne({ student_id: studentId })

            if (!student) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${studentId} not found.`
                });
            }

            return student._doc;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new DurationController();