import React from "react";
import { Route, Routes } from "react-router-dom";
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
            <Route path="common/*" element={<HomeCommon />} />
            <Route path="scf/*" element={<HomeSCF />} />
            <Route path="guarantee/*" element={<HomeGuarantee />} />
            <Route path="lc/*" element={<HomeLC />} />
            <Route path="business-health/*" element={<HomeBusinessHealth />} />
            <Route path="main-page/*" element={<HomePage />} />
          </Routes>
        </HomeLayoutRoutes>
      ) : (
        <MainRoute />
      )}
    </>
  );
};

export default AppRoutes;
