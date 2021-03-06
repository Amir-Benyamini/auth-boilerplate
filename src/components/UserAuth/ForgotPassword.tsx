import React, { useState } from "react";
import { forgotPassword } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import {Link } from "react-router-dom";
export const ForgotPassword: React.FC = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const { email } = values;

  const updateInput = (value: string, name: string) => {
    const updatedValues = { ...values };
    //@ts-ignore
    updatedValues[name] = value;
    setValues(updatedValues);
  };

  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    let response = await forgotPassword(email);
    if (response) {
      console.log(response);
      if (response.ok) {
        toast.success(`${JSON.parse(response.data).message}`);
      } else {
        toast.error(`${JSON.parse(response.data).error}`);
      }
    }
  };

  const forgotPasswordForm = () => (
    <form className="login-btn">
      <h1 className="center-row">Forgot Password</h1>
      <hr />
      <div className="form-group">
        <label className="label text-muted">Email address</label>
        <input
          required
          onChange={(e) => updateInput(e.target.value, e.target.name)}
          className="form-control"
          type="text"
          value={email}
          name="email"
        />
      </div>

      <button className="btn btn-primary btn-block" onClick={onFormSubmit}>
        Send Reset Password Link
      </button>
      <div className="center-row">
        <Link to="/login">back to login page</Link>
      </div>
    </form>
  );

  return (
    <div id="grid-container">
      <ToastContainer />
      <div className="head"></div>
      <div className="main center-col">
        <div className="form-frame">{forgotPasswordForm()}</div>
      </div>
      <div className="foot"></div>
    </div>
  );
};
