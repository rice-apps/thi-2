import { NextFunction, Request, Response } from "express";
const Student = require("../models/student")
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");

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
}

module.exports = new StudentController();