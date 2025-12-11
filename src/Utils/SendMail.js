import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    try {
        return await transporter.sendMail(mailOptions)
            .then(() => console.log("MAIL SENT"))
            .catch(err => console.log("MAIL ERROR:", err));
    } catch (error) {
        console.log(error);
    }
}

export default sendMail;