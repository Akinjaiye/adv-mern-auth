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
    { label: "At least 8 characters", valid: newPassword.length >= 8 },
    { label: "At least one lowercase letter", valid: /[a-z]/.test(newPassword) },
    { label: "At least one uppercase letter", valid: /[A-Z]/.test(newPassword) },
    { label: "At least one number", valid: /\d/.test(newPassword) },
    { label: "At least one symbol (!@#$%)", valid: /[!@#$%^&*]/.test(newPassword) },
  ];

  const isStrongPassword = () => passwordChecklist.every(rule => rule.valid);

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
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-indigo-600 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <ul className="text-sm space-y-1">
            {passwordChecklist.map((rule, i) => (
              <li
                key={i}
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
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
