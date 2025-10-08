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
import { useInactivityDetector } from "./hooks/useInactivityDetector";

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

  // Inactivity Detection: 3 minutes = 180,000 milliseconds
  const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 3 minutes

  const handleInactivity = () => {
    // Only show modal if user is authenticated
    if (auth.isAuthenticated && auth.accessToken) {
      setShowLogoutModal(true);
    }
  };

  const { resetInactivityTimer } = useInactivityDetector({
    onInactive: handleInactivity,
    delay: INACTIVITY_TIMEOUT,
    events: [
      'mousedown',
      'mousemove', 
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'wheel',
      'keydown',
      'keyup'
    ]
  });

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // The logout will be handled by NotificationLogOut component
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
    // Reset the inactivity timer when user cancels
    resetInactivityTimer();
  };

  return (
    <BrowserRouter>
      <AppRoutes />
      {showLogoutModal && (
        <NotificationLogOut 
          visible={showLogoutModal}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
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
