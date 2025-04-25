import express, { NextFunction, Request, Response } from "express";
const HttpStatus = require("http-status-codes");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

//const rateLimit = require("express-rate-limit");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT;
//const port = 3000;
const { default: mongoose } = require("mongoose");

const uri =
    "mongodb+srv://" +
    process.env.MONGO_ADMIN_USERNAME +
    ":" +
    process.env.MONGO_ADMIN_PASSWORD +
    "@thi-cluster.nkv5u.mongodb.net/thi-behavior?retryWrites=true&w=majority&appName=thi-cluster";

async function run() {
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
        const app = express();

        app.use(cors());
        app.use(
            morgan(
                ":date :method :url :status :res[content-length] - :response-time ms"
            )
        );
        app.use(express.json());
        app.use("/api", require("./routes"));

        app.use([notFoundHandle, responseHandle]);

    // app.listen(port, () => {
    //   console.log(`App listening at http://localhost:${port}`);

    // });
    app.listen(3002, () => {
      console.log(`App listening at http://localhost:3002`);
    });
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir);

const notFoundHandle = (req: Request, res: Response, next: NextFunction) => {
    next({
        success: false,
        statusCode: HttpStatus.StatusCodes.NOT_FOUND,
        message: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.NOT_FOUND),
    });
};

const responseHandle = (
    output: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { success, statusCode, status, message, ...rest } = output;
    const code =
        statusCode || status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    if (success) {
        res.status(HttpStatus.StatusCodes.OK).json({ ...output });
        return;
    }
    res.status(code).json({
        success: success,
        statusCode,
        message,
        ...rest,
    });
};
run().catch(console.dir);
