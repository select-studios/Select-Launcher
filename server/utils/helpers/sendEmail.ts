import * as nodemailer from "nodemailer";
import { VerifyEmail } from "../../data/emails/verify/verify";
import { render } from "@react-email/render";

export const sendEmail = async (
  email: any,
  content: { to: string; subject: string },
  url: string
) => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_SERVICE,
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Boolean(EMAIL_SECURE),
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // const emailHtml = render(VerifyEmail({ username: to, url }));
  const emailHtml = render(email);

  const mailOptions = {
    ...content,
    from: EMAIL_USER,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(error);
  }
};
