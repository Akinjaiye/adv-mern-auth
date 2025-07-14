export default function Home({ setUser, user }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 gap-4">
      <h1 className="text-3xl font-bold text-blue-800">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <LogoutButton setUser={setUser} />
    </div>
  );
}
