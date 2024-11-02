import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Student = require("../models/student")
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");

class StudentController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const student = new Student(req.body);
            const savedStudent = await student.save();

            return savedStudent;
        } catch (err: any) {
            throw err;
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req)

            const newData = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(id, newData);

            if (!updatedStudent) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${id} not found.`
                })
            }

            return updatedStudent;
        } catch (err: any) {
            throw err;
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req)

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                    message: `Invalid ID format for student: ${id}.`,
                });
            }

            const deletedStudent = await Student.findByIdAndDelete(id);

            if (!deletedStudent) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${id} not found.`,
                });
            }

            return deletedStudent;
        } catch (err: any) {
            throw err;
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req)

            const student = await Student.findById(id);

            if (!student) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Student with id ${id} not found.`
                })
            }

            return student;
        } catch (err: any) {
            throw err;
        }
    }
}

const getId = (req: Request) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
            message: `Invalid ID format for student: ${id}.`,
        });
    }

    return id;
}

module.exports = new StudentController();