// import transporter from "../config/mail.config.js";

// export const sendMail = async (req, res) => {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ error: 'Name, email, and message are required.' });
//     }
//     try {
//         const mailOptions = {
//             // Use RECEIVER_EMAIL if set (site owner), otherwise fall back to the configured sender
//             from: process.env.EMAIL_USER || process.env.EMAIL,
//             to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER || process.env.EMAIL,
//             subject: `New Message from ${name}`,
//             html: `
//         <h3>New Contact Form Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Email sent successfully.' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send email.' });
//     }
// };

import { resend } from "../config/mail.config.js";


export const sendMail = async (req, res) => {
    try {
        console.log("📩 Incoming body:", req.body);
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }
        const result = await resend.emails.send({
            from: "NSS Website <noreply@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject: `New Message from ${name}`,
            html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });
        console.log("✅ Resend result:", result);

        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
};
