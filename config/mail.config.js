// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         // Accept either EMAIL_USER or EMAIL (some setups use EMAIL)
//         user: process.env.EMAIL_USER || process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export default transporter;
import dotenv from "dotenv";
import { Resend } from 'resend';
dotenv.config();
export const resend = new Resend(process.env.RESEND_API_KEY);
