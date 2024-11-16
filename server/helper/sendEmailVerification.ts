import { Resend } from "resend";
require("dotenv").config();

module.exports = new Resend(process.env.RESEND_API_KEY);
