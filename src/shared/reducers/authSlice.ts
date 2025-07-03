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
    } catch (err) {
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
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
      localStorage.removeItem("access_token");
    },
    setAuthFromToken(state, action) {
    state.accessToken = action.payload.accessToken;
    state.isAuthenticated = true;
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

export const { logout, setAuthFromToken  } = authSlice.actions;
export default authSlice.reducer;