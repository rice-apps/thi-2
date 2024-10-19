import express from 'express';
const router = express.Router();
const auth = require("./auth.ts");

router.use('/auth', auth);


module.exports = router;