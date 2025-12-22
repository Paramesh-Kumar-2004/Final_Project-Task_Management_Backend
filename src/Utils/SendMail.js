import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendMail(mailOptions)
            .then(() => console.log("MAIL SENT TO :", mailOptions.to))
            .catch(err => console.log("MAIL ERROR:", err));
    } catch (error) {
        console.log(error);
    }
}

export default sendMail;