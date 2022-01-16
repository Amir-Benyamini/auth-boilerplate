import React from "react";
import GoogleLoginComp from "./GoogleLoginButton";
import FacebookLoginComp from "./FacebookLoginButton";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";
export const LoginScreen: React.FC = () => {
  return (
    <div id="grid-container">
      <div className="head"></div>
      <div className="main center-col">
        <div className="form-frame">
          <h1 className="align-text">App Login</h1>
          {/* <GoogleLoginComp />
          <FacebookLoginComp /> */}
          <h5 className="or">
            <span>Or</span>
          </h5>
          <LoginForm />
          <div className="center-row">
            Dont have an account?<Link to="/signup">signup here!</Link>
          </div>
        </div>
      </div>

      {/* <div className="center-row main">
        
      </div> */}

      <div className="foot"></div>
    </div>
  );
};
