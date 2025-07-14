import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("authToken"); 
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/check-auth", {
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-600 font-semibold text-xl animate-pulse">
          Checking authentication...
        </div>
      </div>
    );
  }

return (
  <>
    <Routes>
      
      <Route
        path="/"
        element={
          <PublicRoute user={user}>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute user={user}>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <LoginPage setUser={setUser} />
          </PublicRoute>
        }
      />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      
      <Route
        path="/home"
        element={
          <ProtectedRoute user={user}>
            <Home user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>

    <ToastContainer position="top-center" autoClose={3000} />
  </>
);

}
