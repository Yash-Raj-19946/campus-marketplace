import axios from "axios";

export const sendVerificationMail = async (email, token) => {
  const link = `${process.env.CLIENT_URL}/verify-email/${token}`;

  try {
    await axios.post(
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
          <br/><br/>
          <p>If you didn’t create this account, you can ignore this email.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`📧 Verification email sent to ${email}`);
  } catch (err) {
    console.error("❌ BREVO EMAIL ERROR:", err.response?.data || err.message);
    // IMPORTANT: do NOT crash registration
  }
};
