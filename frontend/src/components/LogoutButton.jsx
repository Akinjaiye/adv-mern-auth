
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null); // clear user state
    navigate("/login"); // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      Logout
    </button>
  );
}
