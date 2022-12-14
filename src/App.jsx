import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "./component/Button";
import Container from "./component/Container";
import Forgot_password from "./lrpPages/forgot_password";
import Login from "./lrpPages/login";
import Register from "./lrpPages/register";
import Reset_password from "./lrpPages/reset_password";
import Cart from "./mainPages/Cart";
import Dashboard from "./mainPages/dashboard";
import Detail from "./mainPages/detail";
import History from "./mainPages/History";
import ProtectedRoute from "./protectRoute";

function App() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot_password" element={<Forgot_password />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<Reset_password />}
        ></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/product/detail/:uuid"
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="*" element={navigate("/login")}></Route> */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
