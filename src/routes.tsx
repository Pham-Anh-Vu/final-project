import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./modules/home";
import HomeCommon from "./modules/home/common";
import HomeSCF from "./modules/home/scf";
import HomeGuarantee from "./modules/home/guarantee";
import HomeLC from "./modules/home/lc";
import HomeBusinessHealth from "./modules/home/business-health";
import MainRoute from "./modules/main-view/App";
import HomeLayoutRoutes from "./modules/home/home-layout/home-layout-routes";
import HomeRoute from "./modules/home/routes";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { ConfigProvider } from "antd";
import themeApp from "./shared/theme/themeAppLayoutConfig";
import { logout, setAuthFromToken } from "./shared/reducers/authSlice";

const AppRoutes = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const exp = payload.exp * 1000; // Giờ hết hạn theo millis
      if (Date.now() < exp) {
        // Token còn hạn -> cập nhật Redux
        dispatch(setAuthFromToken({ accessToken }));
      } else {
        // Token hết hạn
        dispatch(logout());
        localStorage.removeItem("access_token");
      }
    } catch (err) {
      console.error("Token không hợp lệ:", err);
      dispatch(logout());
      localStorage.removeItem("access_token");
    }
  }
  }, []);

  return auth.isAuthenticated ? (
    <MainRoute />
  ) : (
    <ConfigProvider theme={themeApp}>
      <HomeLayoutRoutes>
        <HomeRoute />
      </HomeLayoutRoutes>
    </ConfigProvider>
  );
};

export default AppRoutes;
