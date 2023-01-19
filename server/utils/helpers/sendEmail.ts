import nodemailer = require("nodemailer");

export const sendEmail = async (email: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE),
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      clientId:
        "817129869208-frht5ve7jl5achkufp82o2ojgve52sua.apps.googleusercontent.com",
      clientSecret: "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",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "(SelectStudios) - Confirm your email",
    html: `
        <h1>Please click on the link to confirm your email</h1>
        <p>${url}</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(error);
  }
};
