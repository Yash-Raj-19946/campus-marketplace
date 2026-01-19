import nodemailer from "nodemailer";

let transporter; // will be initialized later

export const initMailer = () => {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("❌ EMAIL ERROR:", err);
    } else {
      console.log("✅ EMAIL SERVER READY");
    }
  });
};

export const sendVerificationMail = async (email, token) => {
  if (!transporter) {
    throw new Error("Mailer not initialized");
  }

  const link = `${process.env.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Campus Marketplace" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify your college email",
    html: `
      <h2>Campus Marketplace</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${link}">${link}</a>
      <br/><br/>
      <p>If you didn’t create this account, you can ignore this email.</p>
    `,
  });

  console.log(`📧 Verification email sent to ${email}`);
};
