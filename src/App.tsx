import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { LoginScreen } from "./components/UserAuth/LoginScreen";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./components/PageNotFound";
import ProtectedRoutes from "./components/UserAuth/ProtectedRoutes";
import { Profile } from "./components/UserAuth/Profile";
import { Signup } from "./components/UserAuth/Signup";
import { ForgotPassword } from "./components/UserAuth/ForgotPassword";
import { ResetPassword } from "./components/UserAuth/ResetPassword";
import { NavComp } from "./components/NavBar";
import { Home } from "./components/Home";
import { Acivate } from "./components/UserAuth/Activate";

const App: React.FC = () => {
  return (
    <div>
      <NavComp />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/activate/:token" element={<Acivate />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
