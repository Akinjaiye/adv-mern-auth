export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}
