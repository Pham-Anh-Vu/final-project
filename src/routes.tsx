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
import { useAppSelector } from "./hooks/hooks";
import { ConfigProvider } from "antd";
import themeApp from "./shared/theme/themeAppLayoutConfig";

const AppRoutes = () => {
  const auth = useAppSelector((state) => state.auth);

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
