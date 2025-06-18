export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  userInfo: any;
}

export async function loginAPI(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8081/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  console.log("Response status:", response.status);
  console.log("Response body:", JSON.stringify({ username, password }));


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json(); // Trả về accessToken, refreshToken, userInfo...
}