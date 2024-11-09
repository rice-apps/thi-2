import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Abc = require("../models/abc");
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");

class AbcController {
        async create(req: Request, res: Response, next: NextFunction) {
                // TODO -- get the id of the account that is logged in
                try {
                        const abc = new Abc(req.body);
                        const savedAbc = await abc.save();
                        return savedAbc
                } catch (err: any) {
                        throw err;
                }
        }
        async getAllRecordsByAccount(req: Request, res: Response, next: NextFunction) {
                const { id } = req.body;
                // not sure if account email will be in the body -- method of doing this may be changed in the future
                const account = await Account.findById(id, "_id password is_admin is_deleted").exec();
                if (!account || account.is_deleted) {
                        throw new ErrorResponse({
                            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                            message: "ACCOUNT NOT FOUND",
                        })
                    }
                const abcs = await Abc.find({staff: account._id}).exec();
                if (!abcs) {
                        throw new ErrorResponse({
                                statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                                message: `Abcs created by staff ${id} not found.`
                            })
                } 
                return abcs;

        }
        async getRecordByID(req: Request, res: Response, next: NextFunction) {
                try{
                        const id = getId(req);
                        const abc = await Abc.findById(id)
                        if (!abc) {
                                throw new ErrorResponse({
                                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                                    message: `Abc with id ${id} not found.`
                                })
                            }
                
                            return abc;
                        } catch (err: any) {
                            throw err;
                        }
        }
        async updateRecordById(req: Request, res: Response, next: NextFunction) {
                try{
                        const id = getId(req);
                        const newData = req.body;
                        const updatedAbc = await Abc.findByIdAndUpdate(id, newData)
                        if (!updatedAbc) {
                                throw new ErrorResponse({
                                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                                    message: `Abc with id ${id} not found.`
                                })
                            }
                
                            return updatedAbc;
                        } catch (err: any) {
                            throw err;
                        }
        }
        async deleteRecordById(req: Request, res: Response, next: NextFunction) {
                try{
                        const id = getId(req);
                        if (!mongoose.Types.ObjectId.isValid(id)) {
                                throw new ErrorResponse({
                                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                                    message: `Invalid ID format for abc: ${id}.`,
                                });
                            }
                        const deletedAbc = await Abc.findByIdAndDelete(id)
                        if (!deletedAbc) {
                                throw new ErrorResponse({
                                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                                    message: `Abc with id ${id} not found.`
                                })
                            }
                
                            return deletedAbc;
                        } catch (err: any) {
                            throw err;
                        }
        }
        async exportRecord(req: Request, res: Response, next: NextFunction) {
                // TODO: Implement
        }
        async importRecord(req: Request, res: Response, next: NextFunction) {
                // TODO: Implement
        }

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
    }

module.exports = new AbcController();