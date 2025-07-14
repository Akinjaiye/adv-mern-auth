import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setStatus("❌ Invalid verification link.");
      setSuccess(false);
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
          setSuccess(false);
        }
      } catch (err) {
        setStatus(`❌ Server error: ${err.message}`);
        setSuccess(false);
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Email Verification
        </h2>

        {success === null && (
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
            <svg
              className="animate-spin h-6 w-6 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p>Verifying your token...</p>
          </div>
        )}

        {success !== null && (
          <p
            className={`text-lg font-medium ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-4">
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
}
