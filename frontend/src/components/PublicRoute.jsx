import { Navigate } from "react-router-dom";

export default function PublicRoute({ user, children }) {
  if (user && user.isVerified) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
