// src/pages/SignUpPage.jsx
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSignup = async (formData) => {
  try {
    const { token, user } = await signupUser(formData);

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <>
     <AuthForm
  heading="Create Account"
  buttonText="Sign Up"
  onSubmit={handleSignup}
  showNameField={true}
  alternateText="Already have an account?"
  alternateLink="/login"
  alternateLinkText="Log in"
/>
      {error && (
        <p className="text-center text-red-500 mt-2 font-semibold">{error}</p>
      )}
    </>
  );
}
