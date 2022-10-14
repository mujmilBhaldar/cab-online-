import React, { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";
import adminRoutes from "../../shared/routes/AdminRoutes";
interface ISidebarRouteProps {}

const SidebarRoute: React.FunctionComponent<ISidebarRouteProps> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Array.isArray(adminRoutes) &&
            adminRoutes.map(({ path, component }, i) => (
              <Route key={path + i} path={path} element={component} />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default SidebarRoute;
