import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const { Abc, Account } = require("../models");
const fileUpload = require("express-fileupload");
const excelToJson = require("convert-excel-to-json");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");

class AbcController {
    async create(req: Request, res: Response, next: NextFunction) {
        // TODO -- get the id of the account that is logged in
        try {
            const abc = new Abc(req.body);
            const savedAbc = await abc.save();
            return savedAbc;
        } catch (err: any) {
            throw err;
        }
    }
    async getAllRecordsByAccount(req: any, res: Response, next: NextFunction) {
        const { id } = req.user;
        // not sure if account email will be in the body -- method of doing this may be changed in the future
        const account = await Account.findById(
            id,
            "_id password is_admin is_deleted"
        ).exec();
        if (!account || account.is_deleted) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "ACCOUNT NOT FOUND",
            });
        }
        const abcs = await Abc.find({ staff: account._id }).exec();
        if (!abcs) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                message: `Abcs created by staff ${id} not found.`,
            });
        }
        return abcs;
    }
    async getRecordByID(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req);
            const abc = await Abc.findById(id);
            if (!abc) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Abc with id ${id} not found.`,
                });
            }

            return abc;
        } catch (err: any) {
            throw err;
        }
    }
    async updateRecordById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req);
            const newData = req.body;
            const updatedAbc = await Abc.findByIdAndUpdate(id, newData);
            if (!updatedAbc) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Abc with id ${id} not found.`,
                });
            }

            return updatedAbc;
        } catch (err: any) {
            throw err;
        }
    }
    async deleteRecordById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = getId(req);
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                    message: `Invalid ID format for abc: ${id}.`,
                });
            }
            const deletedAbc = await Abc.findByIdAndDelete(id);
            if (!deletedAbc) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Abc with id ${id} not found.`,
                });
            }

            return deletedAbc;
        } catch (err: any) {
            throw err;
        }
    }
    async exportRecord(req: any, res: Response, next: NextFunction) {
        // TODO: Implement
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let record: File = req.files.record;

        // Process your file
        const result: JSON = excelToJson({
            sourceFile: record.name,
        });

        // for (const key in result) {
        //     console.log(`${key}: ${result[key]}`);
        // }
    }
    // async importRecord(req: Request, res: Response, next: NextFunction) {
    //     // TODO: Implement
    // }
}

const getId = (req: Request) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
            message: `Invalid ID format for abc: ${id}.`,
        });
    }

    return id;
};

module.exports = new AbcController();
