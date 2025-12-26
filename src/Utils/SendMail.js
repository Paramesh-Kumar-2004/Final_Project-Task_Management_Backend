// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();



// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: "smtp.gmail.com",
//     secure: false,
//     port: 465,
//     auth: {
//         user: process.env.USER_EMAIL,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.USER_EMAIL,
//         to,
//         subject,
//         text,
//     };
//     try {
//         await transporter.sendEmail(mailOptions)
//             .then(() => console.log("MAIL SENT TO :", mailOptions.to))
//             .catch(err => console.log("MAIL ERROR:", err));
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default sendEmail;










// // Brevo
// import SibApiV3Sdk from "sib-api-v3-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// const client = SibApiV3Sdk.ApiClient.instance;
// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// const sendEmail = async (to, subject, text) => {
//   try {
//     // console.log(apiKey.apiKey);

//     const emailData = {
//       sender: {
//         email: process.env.PASS_MAIL,
//         name: "Paramesh Kumar S"
//       },
//       to: [
//         {
//           email: to,
//         },
//       ],
//       subject: subject,
//       textContent: text,
//     };

//     await tranEmailApi.sendTransacEmail(emailData);
//     console.log("MAIL SENT TO USING Brevo ");

//   } catch (error) {
//     console.error("MAIL ERROR:", error);
//   }
// };

// export default sendEmail;





















import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();


const sendEmail = async (to, subject, text, html) => {
  try {
    const emailData = {
      sender: {
        name: "Paramesh Kumar S",
        email: process.env.PASS_MAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      textContent: text,
      htmlContent: html,
    };

    await tranEmailApi.sendTransacEmail(emailData);
    console.log("Email sent successfully via Brevo");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;