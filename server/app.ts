import express from 'express';
const cors = require("cors");
const morgan = require("morgan");
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

async function run() {
    try {
      await mongoose.connect(uri);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      const app = express();
  
      app.use(express.json());
      app.use(cors());
      app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms'));
      app.use('/api', require("./routes"));
  
      app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close();
    }
  }
  
  run().catch(console.dir);