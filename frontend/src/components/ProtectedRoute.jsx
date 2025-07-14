import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user || !user.isVerified) {
    return <Navigate to="/login" replace />;
  }
  return children;
}