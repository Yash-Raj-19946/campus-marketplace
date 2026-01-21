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

  // ✅ sanitize base URL (removes newline, spaces, trailing slash)
  const baseUrl = process.env.CLIENT_URL.trim().replace(/\/+$/, "");
  const link = `${baseUrl}/verify-email/${token}`;

  console.log("🔗 Verification link:", link);

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.EMAIL_FROM,
          name: "Campus Marketplace",
        },
        to: [{ email }],
        subject: "Verify your college email",

        // ✅ DISABLE BREVO CLICK TRACKING (CRITICAL)
        params: {
          disableTracking: true,
        },

        // ✅ HTML EMAIL
        htmlContent: `
          <h2>Campus Marketplace</h2>
          <p>Please verify your email:</p>
          <p>
            <a href="${link}" target="_blank" rel="noopener noreferrer">
              Verify Email
            </a>
          </p>
          <p>If the button doesn’t work, copy and paste this link:</p>
          <p>${link}</p>
        `,

        // ✅ TEXT FALLBACK (NO LINK REWRITE)
        textContent: `Verify your email: ${link}`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("✅ Brevo email sent, status:", response.status);
  } catch (err) {
    console.error(
      "❌ BREVO EMAIL ERROR:",
      err.response?.data || err.message
    );
  }
};
