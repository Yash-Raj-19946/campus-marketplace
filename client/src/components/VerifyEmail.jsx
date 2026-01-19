import { useEffect, useState } from "react";
import { verifyEmail } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying"); 
  // verifying | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");

        // optional: auto-redirect after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  if (status === "verifying") {
    return <h3>Verifying your email...</h3>;
  }

  if (status === "success") {
    return <h3>✅ Email verified successfully! Redirecting to login…</h3>;
  }

  return <h3>❌ Verification failed or link expired.</h3>;
};

export default VerifyEmail;
