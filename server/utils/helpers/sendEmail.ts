import * as nodemailer from "nodemailer";
import { VerifyEmail } from "../../data/emails/verify/verify";
import { render } from "@react-email/render";

export const sendEmail = async (email: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE),
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = render(VerifyEmail({ username: email, url }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "[Select Studios] - Verify your account registration.",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(error);
  }
};
