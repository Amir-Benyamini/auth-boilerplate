import nodeMailer from "nodemailer";
import { Request, Response } from "express";

interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}
export const sendEmailWithNodemailer = (
  req: Request,
  res: Response,
  emailData: EmailData
) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_FROM!, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: process.env.GMAIL_APP_PASSWORD!, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        message: `Email has been sent to ${emailData.to}. Follow the instruction to activate your account`,
      });
    })
    .catch((err: Error) => console.log(`Problem sending email: ${err}`));
};
