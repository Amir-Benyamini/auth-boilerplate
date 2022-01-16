import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginScreen } from "./components/UserAuth/LoginScreen";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./components/PageNotFound";
import ProtectedRoutes from "./components/UserAuth/ProtectedRoutes";
import { Profile } from "./components/UserAuth/Profile";
import { NavComp } from "./components/NavBar";
import { Signup } from "./components/UserAuth/Signup";
import { Home } from "./components/Home";
const App: React.FC = () => {
  return (
    <div>
      <NavComp />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<Signup />} />
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
