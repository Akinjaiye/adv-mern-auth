// pages/ResetPasswordPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (!tokenFromURL) {
      setError("Invalid or missing token");
    } else {
      setToken(tokenFromURL);
    }
  }, [searchParams]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      {!message && (
        <form onSubmit={handleReset}>
          <input
            type="password"
            className="w-full border p-2 mb-2"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
