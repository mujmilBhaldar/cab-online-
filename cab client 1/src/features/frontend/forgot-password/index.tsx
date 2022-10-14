import * as React from "react";

import { Routes, Route } from "react-router-dom";
import PasswordChange from "./PasswordChange";
import PasswordResetLink from "./PasswordResetLink";

interface IForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (
  props
) => {
  return (
    <>
      <Routes>
        <Route index element={<PasswordResetLink />} />
        <Route path="/:token" element={<PasswordChange />} />
      </Routes>
    </>
  );
};

export default ForgotPassword;
