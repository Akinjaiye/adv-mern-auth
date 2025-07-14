import { useState } from "react";
import { Link } from "react-router-dom";


// components/AuthForm.jsx

export default function AuthForm({
  heading,
  buttonText,
  onSubmit,
  alternateText,
  alternateLink,
  alternateLinkText,
  extraLink,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{heading}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {buttonText}
        </button>
      </form>

      {/* Forgot password link if provided */}
      {extraLink && <div className="mt-2 text-right">{extraLink}</div>}

      <div className="mt-4 text-sm text-center text-gray-600">
        {alternateText}{" "}
        <a href={alternateLink} className="text-blue-500">
          {alternateLinkText}
        </a>
      </div>
    </div>
  );
}
