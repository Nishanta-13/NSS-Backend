import express from "express";
import { sendMail } from "../controller/mail.controller.js";

const mailRouter = express.Router();

mailRouter.post("/contact", sendMail);

export default mailRouter;