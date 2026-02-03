import express from "express";
import { sendMail } from "../controller/mail.controller.js";

const router = express.Router();

router.post("/contact", sendMail);

export default router;