import { NextFunction, Request, Response } from "express";
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
            const id = req.params.id;
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
            const id = req.params.id;
            const deletedStudent = await Student.findByIdAndDelete(id);

            if (!deletedStudent) {
                console.log("did not delete student")
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
            const id = req.params.id;
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

module.exports = new StudentController();