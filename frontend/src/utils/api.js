const BASE_URL = "http://localhost:3000/api/auth";

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Login failed");
  }

  return responseData;
}

// ✅ ADD THIS FUNCTION
export async function signupUser(data) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include", // 🔥 include cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Signup failed");
  }

  return responseData;
}
