// components/AuthLayout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-md">{children}</div>
    </div>
  );
}
