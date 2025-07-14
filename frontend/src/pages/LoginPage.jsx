import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../utils/api";

export default function LoginPage({ setUser }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { user } = await loginUser(formData);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Welcome Back
        </h2>

        <AuthForm
          heading=""
          buttonText="Sign In"
          onSubmit={handleLogin}
          alternateText="Don't have an account?"
          alternateLink="/signup"
          alternateLinkText="Sign Up"
          extraLink={
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          }
        />

        {error && (
          <p className="text-center text-red-500 mt-4 font-semibold">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
