import { NextFunction, Request, Response } from "express";
const { Account } = require("../models");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");

class AuthController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, password, first_name, last_name } = req.body;
    const account = new Account({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      is_admin: true,
      is_active: true,
      is_deleted: true,
      authorization_token: "test",
    });
    try {
      await account.save();
      return { message: "Request processed!", id: account._id };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  //controller for signing up a user
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (email.length > 20) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: "Email too long",
      });
    }

    try {
      await account.save();
      return { message: "Request processed!", id: account._id };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
}

module.exports = new AuthController();
