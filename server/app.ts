import express from 'express';
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const port = 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require("mongoose");

const uri = 
  "mongodb+srv://" +
  process.env.MONGO_ADMIN_USERNAME +
  ":" +
  process.env.MONGO_ADMIN_PASSWORD +
  "@thi-cluster.nkv5u.mongodb.net/thi-behavior?retryWrites=true&w=majority&appName=thi-cluster";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
async function run() {
    try {
      await mongoose.connect(uri, {serverSelectionTimeoutMS: 5000});
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const app = express();
      
      app.use(express.json());
      app.use(cors());
      app.use(helmet());
      app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms'));
      // app.use(limiter);
      app.use('/api', require("./routes"));
  
      app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  run().catch(console.dir);