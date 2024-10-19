import express, { Request, Response } from 'express';
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const port = 3000;



async function run() {
    try {
    //   await mongoose.connect(uri);
    //   console.log(
    //     "Pinged your deployment. You successfully connected to MongoDB!",
    //   );
      const app = express();
  
      app.use(express.json());
      app.use(cors());
      app.use(morgan("tiny"));
      app.use('/api', routes);
      app.get('/', (req: Request, res: Response) => {
        res.send("Request Received!");
      });
  
      app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  run().catch(console.dir);