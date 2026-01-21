import axios from "axios";

console.log("📨 mail.js loaded");

export const sendVerificationMail = async (email, token) => {
  console.log("📨 sendVerificationMail called for:", email);

  if (!process.env.BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY missing");
    return;
  }

  if (!process.env.EMAIL_FROM) {
    console.error("❌ EMAIL_FROM missing");
    return;
  }

  if (!process.env.CLIENT_URL) {
    console.error("❌ CLIENT_URL missing");
    return;
  }

  const baseUrl = process.env.CLIENT_URL
    .trim()
    .replace(/\/+$/, "");

  const link = `${baseUrl}/verify-email/${token}`;

  console.log("🔗 Verification link:", link);

  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.EMAIL_FROM,
          name: "Campus Marketplace",
        },
        to: [{ email }],
        subject: "Verify your college email",
        htmlContent: `
          <h2>Campus Marketplace</h2>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${link}">${link}</a>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("✅ Brevo response:", res.status);
  } catch (err) {
    console.error(
      "❌ BREVO EMAIL ERROR:",
      err.response?.data || err.message
    );
  }
};
