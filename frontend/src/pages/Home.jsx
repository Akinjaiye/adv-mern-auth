import LogoutButton from "../components/LogoutButton";

export default function Home({ user, setUser }) {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome, {user?.name}!
      </h1>

      <p className="text-center text-gray-700 mb-4">
        Email: {user?.email}
      </p>

      <div className="text-center mt-6">
        <LogoutButton setUser={setUser} />
      </div>
    </div>
  );
}
