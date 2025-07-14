import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (!tokenFromURL) {
      toast.error("Missing token in URL");
    } else {
      setToken(tokenFromURL);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isStrongPassword(newPassword)) {
      return toast.error("Password does not meet security requirements");
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/reset-password", {
        token,
        newPassword,
      });

      toast.success(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  const isStrongPassword = (password) =>
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-indigo-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <ul className="text-sm mb-3 space-y-1 text-left pl-2">
            {[
              { label: "At least 8 characters", valid: newPassword.length >= 8 },
              { label: "One lowercase letter", valid: /[a-z]/.test(newPassword) },
              { label: "One uppercase letter", valid: /[A-Z]/.test(newPassword) },
              { label: "One number", valid: /\d/.test(newPassword) },
              { label: "One symbol (!@#$%^&*)", valid: /[!@#$%^&*]/.test(newPassword) },
            ].map((rule, i) => (
              <li
                key={i}
                className={`flex gap-2 items-center ${
                  rule.valid ? "text-green-600" : "text-red-500"
                }`}
              >
                {rule.valid ? "✅" : "❌"} {rule.label}
              </li>
            ))}
          </ul>

          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
