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
  try {
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
      let errorMessage = "Đăng nhập thất bại";
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        // Nếu không parse được JSON, sử dụng status code
        switch (response.status) {
          case 400:
            errorMessage = "Thông tin đăng nhập không hợp lệ";
            break;
          case 401:
            errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng";
            break;
          case 403:
            errorMessage = "Tài khoản không có quyền truy cập";
            break;
          case 404:
            errorMessage = "Dịch vụ đăng nhập không khả dụng";
            break;
          case 429:
            errorMessage = "Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau";
            break;
          case 500:
            errorMessage = "Lỗi hệ thống. Vui lòng thử lại sau";
            break;
          case 503:
            errorMessage = "Hệ thống đang bảo trì";
            break;
          default:
            errorMessage = `Lỗi kết nối (${response.status})`;
        }
      }
      
      const error = new Error(errorMessage);
      (error as any).code = response.status;
      throw error;
    }

    return response.json(); // Trả về accessToken, refreshToken, userInfo...
  } catch (networkError: any) {
    // Xử lý lỗi network
    if (networkError.name === 'TypeError' || networkError.message === 'Failed to fetch') {
      const error = new Error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet");
      (error as any).code = 'NETWORK_ERROR';
      throw error;
    }
    
    // Re-throw lỗi đã xử lý từ trên
    throw networkError;
  }
}