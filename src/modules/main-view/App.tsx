/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/registration/SignUp";
import SignIn from "./pages/registration/SignIn";
import Main from "./components/layout/Main";
import 'antd/dist/reset.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import React from "react";
import ConfirmEmail from "./pages/registration/ConfirmEmail";
import DepositListView from "./pages/deposit/DepositListView";
import SysPendingTaskListView from "./pages/syspendingtask/SysPendingTask";
import CreateSavingAccountPage from "./pages/savingaccount/SavingAccountPage";
import EncryptionDemo from "./pages/EncryptionDemo";

function MainRoute() {
  return (
  <div className="App">
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />

      {/* Nếu Main là layout chung */}
      <Route element={<Main />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/customer" element={<Tables />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/rtl" element={<Rtl />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposit" element={<DepositListView />} />
        <Route path="/sysPendingTasks" element={<SysPendingTaskListView />} />
        <Route path="/account-saving" element={<CreateSavingAccountPage />} />
        <Route path="/deposit" element={<DepositListView />} />
        <Route path="/encryption-demo" element={<EncryptionDemo />} />
      </Route>

      {/* Redirect fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </div>
);
}

export default MainRoute;
