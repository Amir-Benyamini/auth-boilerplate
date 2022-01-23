import React from "react";
import GoogleLoginComp from "./GoogleLoginButton";
import FacebookLoginComp from "./FacebookLoginButton";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";
import { isAuth } from "../../services/authHelpers";
import { Navigate } from "react-router-dom";
//@ts-ignore
export const LoginScreen: React.FC = () => {
  const screen = () => (
    <div id="grid-container">
      <div className="head"></div>
      <div className="main center-col">
        <div className="form-frame">
          <h1 className="align-text">App Login</h1>
          <GoogleLoginComp />
          <FacebookLoginComp />
          <h5 className="or">
            <span>Or</span>
          </h5>
          <LoginForm />
          <div className="center-row">
            Dont have an account? <Link to="/signup">signup here!</Link>
          </div>
          <div className="center-row">
            Forgot password?<Link to="/forgot-password">Click here!</Link>
          </div>
        </div>
      </div>

      {/* <div className="center-row main">
	 
  </div> */}

      <div className="foot"></div>
    </div>
  );

  return isAuth() ? <Navigate to="/" /> : screen();
};
