import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { jwtDecode } from "jwt-decode";
import AppRoutes from "./routes";
import useAuthStatus from "./hooks/use-is-authenticated";
import { BrowserRouter } from "react-router-dom";
import NotificationLogOut from "./modules/function/notification-log-out";

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
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: "login-required",
        checkLoginIframe: false, // Disable the login status check via iframe
        pkceMethod: "S256", // Use PKCE for enhanced security
        flow: "standard", // Use standard flow
      }}
    >
      <SecuredContent />
    </ReactKeycloakProvider>
  );
}
const SecuredContent = () => {
  const { keycloak } = useAuthStatus();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Gia hạn token mỗi 60s
  useEffect(() => {
    const intervalId = setInterval(() => {
      keycloak
        .updateToken(5)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed");
          } else {
            console.log("Token still valid");
          }
        })
        .catch(() => {
          setShowLogoutModal(true);
        });
    }, 60000);

    return () => clearInterval(intervalId);
  }, [keycloak]);

  // Đếm thời gian không hoạt động
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const logoutTime = 1 * 60 * 1000;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowLogoutModal(true);
      }, logoutTime);
    };

    ["mousemove", "keydown", "click"].forEach((evt) => {
      window.addEventListener(evt, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      ["mousemove", "keydown", "click"].forEach((evt) => {
        window.removeEventListener(evt, resetTimer);
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
      {showLogoutModal && <NotificationLogOut />}
    </BrowserRouter>
  );
};

export default App;
