import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./modules/home";
import HomeCommon from "./modules/home/common";
import HomeSCF from "./modules/home/scf";
import HomeGuarantee from "./modules/home/guarantee";
import HomeLC from "./modules/home/lc";
import HomeBusinessHealth from "./modules/home/business-health";
import useAuthStatus from "./hooks/use-is-authenticated";
import MainRoute from "./modules/main-view/App";
import HomeLayoutRoutes from "./modules/home/home-layout/home-layout-routes";

const AppRoutes = () => {
  const { isAuthenticated, token, keycloak } = useAuthStatus();
  return (
    <>
      {!isAuthenticated ? (
        <HomeLayoutRoutes>
          <Routes>
            <Route path="/home/common/*" element={<HomeCommon />} />
            <Route path="/home/scf/*" element={<HomeSCF />} />
            <Route path="/home/guarantee/*" element={<HomeGuarantee />} />
            <Route path="/home/lc/*" element={<HomeLC />} />
            <Route path="/home/business-health/*" element={<HomeBusinessHealth />} />
            <Route path="/home/main-page/*" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home/common" />} />
          </Routes>
        </HomeLayoutRoutes>
      ) : (
        <MainRoute />
      )}
    </>
  );
};

export default AppRoutes;
