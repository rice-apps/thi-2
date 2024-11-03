import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT;

const { default: mongoose } = require("mongoose");

const uri = 
  "mongodb+srv://" +
  process.env.MONGO_ADMIN_USERNAME +
  ":" +
  process.env.MONGO_ADMIN_PASSWORD +
  "@thi-cluster.nkv5u.mongodb.net/thi-behavior?retryWrites=true&w=majority&appName=thi-cluster";


async function run() {
    try {
        await mongoose.connect(uri, {serverSelectionTimeoutMS: 5000});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const app = express();
        
        app.use(cors());
        app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms'));
        app.use(express.json());
        app.use('/api', require("./routes"));
        
        app.use(errorHandle);

        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

const errorHandle = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 401).json({
        success: false,
        statusCode: error.statusCode || 401,
        message: error.message,
    })
}
run().catch(console.dir);