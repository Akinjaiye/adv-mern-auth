import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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

  const isStrongPassword = () => passwordChecklist.every((rule) => rule.valid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isStrongPassword()) {
      return toast.error("Password is too weak");
    }

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password: newPassword,
      });

      toast.success(res.data.message || "Signup successful! Check your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full border p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-2"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
