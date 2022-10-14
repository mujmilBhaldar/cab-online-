import React, { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";
import Header from "../ui/header/Header";
import frontendRoute from "../shared/routes/FrontendRoutes";
interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Array.isArray(frontendRoute) &&
            frontendRoute.map(({ path, component }, i) => (
              <Route key={path + i} path={path} element={component} />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default BlankLayout;
