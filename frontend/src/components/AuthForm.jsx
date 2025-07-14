import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({
  heading = "Auth Form",
  buttonText = "Submit",
  onSubmit,
  showNameField = false,
  alternateText = "",
  alternateLink = "",
  alternateLinkText = ""
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {showNameField && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            {buttonText}
          </button>
        </form>
        {alternateText && (
          <p className="mt-4 text-sm text-center">
            {alternateText}{" "}
            <Link to={alternateLink} className="text-blue-600 hover:underline">
              {alternateLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
