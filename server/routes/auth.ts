import express, { Request, Response } from "express";
const router = express.Router();

// Template controller
router.get('/', (req: Request, res: Response) => {
    res.send("Request Received!");
  });

module.exports = router;