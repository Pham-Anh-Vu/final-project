import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import keycloak from "./keycloak";
import { jwtDecode } from "jwt-decode";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import NotificationLogOut from "./modules/function/notification-log-out";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { login, logout } from "./shared/reducers/authSlice";

interface DecodedToken {
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [clientId: string]: {
      roles: string[];
    };
  };
  [key: string]: any;
}

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [username, setUsername] = useState("avuvu1@yopmail.com");
  const [password, setPassword] = useState("1");

  return (
    <BrowserRouter>
      <AppRoutes />
      {showLogoutModal && <NotificationLogOut />}
    </BrowserRouter>

    // <div style={{ padding: 20 }}>
    //   <h1>Đăng nhập với Redux Toolkit</h1>
    //   {auth.isAuthenticated ? (
    //     <>
    //       <p>✅ Đã đăng nhập với token: {auth.accessToken}</p>
    //       <button onClick={() => dispatch(logout())}>Đăng xuất</button>
    //     </>
    //   ) : (
    //     <>
    //       <input value={username} onChange={(e) => setUsername(e.target.value)} />
    //       <input
    //         value={password}
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <button onClick={() => dispatch(login({ username, password }))}>
    //         Đăng nhập
    //       </button>
    //       {auth.loading && <p>Đang đăng nhập...</p>}
    //       {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
    //     </>
    //   )}
    // </div>
  );
}

export default App;
