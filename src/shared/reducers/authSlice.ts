import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./authAPI";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await loginAPI(username, password);
      console.log("Login response:", response);
      return response.access_token;
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = "Đăng nhập thất bại";
      
      if (err.message) {
        // Lỗi từ API backend
        switch (err.message.toLowerCase()) {
          case 'invalid credentials':
          case 'invalid username or password':
            errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng";
            break;
          case 'user not found':
            errorMessage = "Tài khoản không tồn tại";
            break;
          case 'account locked':
          case 'account disabled':
            errorMessage = "Tài khoản đã bị khóa hoặc vô hiệu hóa";
            break;
          case 'too many attempts':
            errorMessage = "Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau";
            break;
          case 'network error':
            errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra internet";
            break;
          default:
            errorMessage = err.message;
        }
      } else if (err.code) {
        // Xử lý error codes
        switch (err.code) {
          case 401:
            errorMessage = "Thông tin đăng nhập không chính xác";
            break;
          case 403:
            errorMessage = "Tài khoản không có quyền truy cập";
            break;
          case 429:
            errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau";
            break;
          case 500:
            errorMessage = "Lỗi hệ thống. Vui lòng thử lại sau";
            break;
          case 503:
            errorMessage = "Hệ thống đang bảo trì. Vui lòng thử lại sau";
            break;
          default:
            errorMessage = `Lỗi hệ thống (${err.code})`;
        }
      }
      
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("access_token");
    },
    setAuthFromToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAuthFromToken, clearError } = authSlice.actions;
export default authSlice.reducer;