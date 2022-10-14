import React, { Suspense, lazy } from "react";

import Sidebar from "../ui/sidebar/Sidebar";
interface ISecuredLayoutProps {}

const SecuredLayout: React.FunctionComponent<ISecuredLayoutProps> = (props) => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default SecuredLayout;
