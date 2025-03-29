import { NextFunction, Request, Response } from "express";
const { Account } = require("../models");
import mongoose from "mongoose";
const { AccountModel } = require("../models");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");

const {
  ErrorResponse,
  resendService,
  emailFormat,
  generateRandomPassword,
} = require("../helper");
const jwt = require("jsonwebtoken");
const SEC_IN_ONE_DAY = 86400;
require("dotenv").config();

class AuthController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, password, first_name, last_name, is_deleted } = req.body;
    // Log function execution start
    console.log(`[INFO] createUser called for email: ${email}`);
    console.log(
      `[DEBUG] Mongoose Connection State: ${mongoose.connection.readyState}`
    );
    console.log(`[DEBUG] Request body received:`, req.body); // Log full request body
    try {
      const existingAccount = await AccountModel.findOne({ email: email });
      console.log(existingAccount);
      if (existingAccount) {
        console.log(`[ERROR] User account has already existed`);
        return {
          message: "Account alreadys exists under this email.",
          id: existingAccount._id,
        };
      }
      console.log(`[DEBUG] The program stops here3`);
    } catch (error) {
      console.error(`[ERROR] Failed to query database:`, error);
      return res
        .status(400)
        .json({ success: false, message: "Database query failed." });
    }

    const account = new AccountModel({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      is_admin: true,
      is_active: false,
      is_deleted: is_deleted,
      authorization_token: "test",
    });
    console.log(`[DEBUG] The program stops here2`);
    try {
      console.log(`[DEBUG] Attempting to save account for email: ${email}`);

      await account.save();
      // Log success
      console.log(`[SUCCESS] User created: ${account._id}`);
      return { message: "Create User Request processed!", id: account._id };
    } catch (error) {
      // Log error
      console.error(`[ERROR] Failed to create user: ${email}`, error);
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }

  /**
   * controller for signing up a user;
   * check whether the account exists (with email), and whether the input password equals temporary password sent by admin  if yes, then set is_active to true
   * @param req
   * @param res
   * @param next
   */
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, tempPassword } = req.body;
    console.log(`[INFO] sign up user called for email: ${email}`);
    if (email.length > 20) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: "Email too long",
      });
    }
    try {
      const userAccount = await AccountModel.findOne({ email: email });
      if (userAccount) {
        console.log(`[INFO] User account with this email ${email} is found `);

        if (userAccount.is_active == true) {
          console.log(`[INFO] User already active`);
          return { message: "Account alreadys exists under this email." };
          //return { message: "user already signed up!" };
        }
        if (userAccount.password == tempPassword) {
          userAccount.is_active = true;
          return {
            message: "User Signed Up!",
            token: jwt.sign(
              { id: userAccount._id },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: 86400,
              }
            ),
          };
        } else {
          throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
            message: "incorrect password!",
          });
        }

        //const randTempPassword = generateRandomPassword();
        // resendService.emails.send(emailFormat(email, randTempPassword));
        // userAccount.password = randTempPassword;
        // userAccount.save();
      } else {
        console.log(
          `[INFO] User account with this email {email} is not found `
        );
        throw new ErrorResponse({
          statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
          message: "ACCOUNT NOT FOUND",
        });
      }
    } catch (error) {
      // Log error
      console.error(`[ERROR] Failed to sign up user: ${email}`, error);
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  /*
  Controller to set user's password after they sign up for an account. 
  */
  async setPassword(req: any, res: Response, next: NextFunction) {
    const newPassword = req.body;
    const id = req.user.id;
    try {
      const userAccount = await AccountModel.findOne({ _id: id });
      console.log(
        `[INFO] About to change ${userAccount.first_name} ${userAccount.last_name}'s password `
      );
      if (userAccount) {
        userAccount.password = newPassword;
        await userAccount.save();
      } else {
        console.log(
          `[INFO] User account with this email {email} is not found `
        );
        throw new ErrorResponse({
          statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
          message: "ACCOUNT NOT FOUND",
        });
      }
    } catch (error) {
      // Log error
      console.error(
        `[ERROR] Failed to set password for this new user. User id: ${id}`,
        error
      );
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  /**
   * Controller for signin a user in to the system;
   * Check whether email and password matches data in the database, if so, generate a new authorization_token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async signIn(req: any, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const account = await AccountModel.findOne(
      { email: email },
      "_id password is_admin is_deleted"
    );
    account.is_deleted = false;
    await account.save();

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
      console.log("DEBUG, does the program stop here");
      const { oldPassword, newPassword } = req.body;
      const id = req.user.id;
      const account = await AccountModel.findOne(
        { _id: id },
        "_id password is_admin is_deleted"
      ).exec();
      console.log("account: ", account);
      //check if the oldpassword is the same
      if (account.password != oldPassword) {
        throw new ErrorResponse({
          statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
          message: "Incorrect old password.",
        });
      }
      //TODO: return error message if old passwords don't match
      account.password = newPassword;
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
   * send out email with a random temporary password (stored in password field), and then return success
   * @param req contains user's email
   * @param res
   * @param next
   */
  async forgetPassword(req: any, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const account = await AccountModel.findOne(
        { email: email },
        "_id password is_admin is_deleted"
      ).exec();
      //TODO: return error message if old passwords don't match
      const randPassword = generateRandomPassword();
      account.password = randPassword;
      account.save();
      resendService.emails.send(emailFormat(email, randPassword));
      return { message: "Request processed!", id: account._id };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  /**
   * Update info (POST) - (input: id, first name, last name) - updating first name and last name, return success
   */
  async updateInfo(req: any, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.body;
      const id = req.user.id;
      const account = await AccountModel.findById(id);
      account.first_name = firstName;
      account.last_name = lastName;
      console.log(`[INFO] Updating User's First and Last Name`);
      await account.save();

      return {
        message: "User First and Last Name successfully updated",
        id: account._id,
      };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  /**
   * Info (GET) (input: id (from token))- used to retrive user's info (including first name and last name),
   * return user's first name and last name
   * @param req
   * @param res
   * @param next
   */
  async info(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const account = await AccountModel.findById(id);

      console.log(
        `[INFO] retriving User's First and Last Name. First Name: ${account.first_name}, Last Name: ${account.last_name}`
      );

      return {
        message: "User First and Last Name successfully updated",
        firstName: account.first_name,
        lastName: account.last_name,
      };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
  //helper function to track whether user information has been updated
  async getUserInfo(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.body.id;
      const account = await AccountModel.findById(id);

      console.log("[INFO] retriving User's info: ", account);

      return {
        message: "User First and Last Name successfully updated",
        email: account.email,
        firstName: account.first_name,
        lastName: account.last_name,
        password: account.password,
        is_admin: account.is_admin,
        is_active: account.is_active,
        is_deleted: account.is_deleted,
      };
    } catch (error) {
      throw new ErrorResponse({
        statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
        message: error,
      });
    }
  }
}

module.exports = new AuthController();
