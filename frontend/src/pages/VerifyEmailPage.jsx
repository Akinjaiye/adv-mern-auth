import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("✅ Email verified successfully! Redirecting to login...");
          setSuccess(true);
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus(`❌ ${data.message || "Verification failed."}`);
        }
      } catch (err) {
        setStatus("❌ Server error. Please try again.", err.message);
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={`text-lg ${success ? "text-green-600" : "text-red-600"}`}>
          {status}
        </p>
      </div>
    </div>
  );
}
