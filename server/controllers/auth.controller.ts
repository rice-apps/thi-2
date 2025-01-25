import { NextFunction, Request, Response } from "express";
import { AccountDocument } from "../models/accountModel";
//const { Account, AccountDocument } = require("../models");
//const { Account, AccountDocument } = require("../models");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  // For reference purposes only, NOT actual implementation

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
  /**
   * controller for signing up a user;
   * check whether the account exists (with email), if yes, then set is_active to true
   * @param req
   * @param res
   * @param next
   */
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (email.length > 20) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: "Email too long",
      });
    }
    Account.findOne({ email: email })
      .exec()
      .then((userAccount: any) => {
        if (userAccount) {
          if (userAccount.is_active == true) {
            return { message: "user already signed up!" };
          }
          userAccount.is_active = true;
          return { message: "User Signed Up!" };
        } else {
          throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
            message: "ACCOUNT NOT FOUND",
          });
        }
      });
  }
  /**
   * Controller for signin a user in to the system;
   * Check whether email and password matches data in the database, if so, generate a new authorization_token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const account = await Account.findOne(
      { email: email },
      "_id password is_admin is_deleted"
    ).exec();
    console.log(account.is_deleted);
    if (!account || account.is_deleted) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: "ACCOUNT NOT FOUND",
      });
    }
    if (account.password == password) {
      return {
        message: "Signed in!",
        token: jwt.sign({ id: account._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400,
        }),
      };
    } else {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: "WRONG PASSWORD",
      });
    }
  }
  /**
   * Controller for user to change their password;
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async changePassword(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.body;
      const account = await Account.findOne(
        { _id: id },
        "_id password is_admin is_deleted"
      ).exec();

      return { message: "Request processed!", id: account._id };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
    return { message: "Success", ...req.user };
  }
}

module.exports = new AuthController();
