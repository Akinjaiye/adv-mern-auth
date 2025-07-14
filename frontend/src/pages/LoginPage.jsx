import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUser }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { token, user } = await loginUser(formData);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // ✅ this will update user state in App.jsx

      navigate("/home"); // ✅ redirect to protected route

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <AuthForm
        heading="Login"
        buttonText="Sign In"
        onSubmit={handleLogin}
        alternateText="Don't have an account?"
        alternateLink="/signup"
        alternateLinkText="Sign up"
      />
      {error && (
        <p className="text-center text-red-500 mt-2 font-semibold">{error}</p>
      )}
    </>
  );
}
