"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithNodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailWithNodemailer = (req, res, emailData) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.GMAIL_APP_PASSWORD, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
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
        .catch((err) => console.log(`Problem sending email: ${err}`));
};
exports.sendEmailWithNodemailer = sendEmailWithNodemailer;
