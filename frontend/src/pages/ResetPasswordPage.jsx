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

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const isStrongPassword = () => {
    return (
      newPassword.length >= 8 &&
      /[a-z]/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      /[!@#$%^&*]/.test(newPassword)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isStrongPassword()) {
      return toast.error("Password does not meet requirements");
    }

    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  const passwordChecklist = [
    {
      label: "At least 8 characters",
      valid: newPassword.length >= 8,
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(newPassword),
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(newPassword),
    },
    {
      label: "At least one number",
      valid: /\d/.test(newPassword),
    },
    {
      label: "At least one symbol (!@#$%)",
      valid: /[!@#$%^&*]/.test(newPassword),
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-2"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <ul className="text-sm mb-3 space-y-1">
          {passwordChecklist.map((rule, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                rule.valid ? "text-green-600" : "text-red-500"
              }`}
            >
              <span>{rule.valid ? "✅" : "❌"}</span> {rule.label}
            </li>
          ))}
        </ul>

        <input
          type={showPassword ? "text" : "password"}
          className="w-full border p-2 mb-2"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
