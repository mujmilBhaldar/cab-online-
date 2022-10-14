import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "./layouts/BlankLayout";
import SecuredLayout from "./layouts/SecuredLayout";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import { useDispatch } from "react-redux";
import { removeUser } from "./app/slices/AuthSlice";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProtectedRoute = (props: any) => {
    const token = sessionStorage.getItem("token");
    useEffect(() => {
      // send a request to server for token verification
      AuthService.validateToken("")
        .then((response) => {
          console.log("token verified");
        })
        .catch((err) => {
          sessionStorage.clear();
          dispatch(removeUser());
          navigate("/login");
        });
    }, []);
    return token ? props.children : <Navigate to="/login" />;
  };

  return (
    <>
      {/* <ExampleDirections /> */}
      <Routes>
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <SecuredLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<BlankLayout />} />
      </Routes>
    </>
  );
}

export default App;
