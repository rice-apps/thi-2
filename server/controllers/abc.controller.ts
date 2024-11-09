import { NextFunction, Request, Response } from "express";
const Abc = require("../models/abc");
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");

class AbcController {
      async create(req: Request, res: Response, next: NextFunction) {
                try {
                        const abc = new Abc(req.body);
                        const savedAbc = await abc.save();
                        return savedAbc
                } catch (err: any) {
                        throw err;
                }
      }
}

module.exports = new AbcController();