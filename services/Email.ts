"use server";

// import nodemailer
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export default async function sendEmail(
  receiver: string,
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: process.env.EMAIL_EMAIL,
    to: receiver,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
}
