import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage({ setUser }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { user } = await loginUser(formData); // don't expect token

      localStorage.setItem("user", JSON.stringify(user)); // optional
      setUser(user); // ✅ this is critical

      navigate("/home"); // ✅ or any route you want after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      import { Link } from "react-router-dom";

<AuthForm
  heading="Login"
  buttonText="Sign In"
  onSubmit={handleLogin}
  alternateText="Don't have an account?"
  alternateLink="/signup"
  alternateLinkText="Sign up"
  extraLink={<Link to="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</Link>}
/>

      {error && (
        <p className="text-center text-red-500 mt-2 font-semibold">{error}</p>
      )}
    </>
  );
}
