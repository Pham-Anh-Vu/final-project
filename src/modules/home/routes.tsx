import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomeCommon from "./common";
import HomeSCF from "./scf";
import HomeGuarantee from "./guarantee";
import HomeLC from "./lc";
import HomeBusinessHealth from "./business-health";
import HomePage from ".";
import SignIn from "../main-view/pages/SignIn";
import SignUp from "../main-view/pages/SignUp";

// const HomeCommon = React.lazy(() => import('./common'));
// const HomeSCF = React.lazy(() => import('./scf'));
// const HomeGuarantee = React.lazy(() => import('./guarantee'));
// const HomeLC = React.lazy(() => import('./lc'));
// const HomeBusinessHealth = React.lazy(() => import('./business-health'));

const HomeRoute = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='common' element={<React.Suspense fallback={<div>Loading...</div>}><HomeCommon /></React.Suspense>} ></Route>
        <Route path='guarantee' element={<React.Suspense fallback={<div>Loading...</div>}><HomeGuarantee /></React.Suspense>} ></Route>
        <Route path='lc' element={<React.Suspense fallback={<div>Loading...</div>}><HomeLC /></React.Suspense>} ></Route>
        <Route path='business-health' element={<React.Suspense fallback={<div>Loading...</div>}><HomeBusinessHealth /></React.Suspense>} ></Route> */}
        {/* <Route path='scf' element={<React.Suspense fallback={<div>Loading...</div>}><HomeSCF /></React.Suspense>} ></Route> */}

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home/common/*" element={<HomeCommon />} />
        <Route path="/home/scf/*" element={<HomeSCF />} />
        <Route path="/home/guarantee/*" element={<HomeGuarantee />} />
        <Route path="/home/lc/*" element={<HomeLC />} />
        <Route
          path="/home/business-health/*"
          element={<HomeBusinessHealth />}
        />
        <Route path="/home/main-page/*" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home/common" />} />
      </Routes>
    </div>
  );
};

export default HomeRoute;
