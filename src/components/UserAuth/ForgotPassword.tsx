import React, { useState } from "react";
import { forgotPassword } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";

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

  const onFormSubmit = async () => {
    //  event.preventDefault();
    let response = await forgotPassword(email);
    if (response) {
      if (response.ok) {
        toast.success(`${JSON.parse(response.data).message}`);
      } else {
        toast.error(`${JSON.parse(response.data).error}`);
      }
    }
  };

  const forgotPasswordForm = () => (
    <form>
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

      <button className="btn btn-primary" onClick={onFormSubmit}>
        Send Reset Password Link
      </button>
    </form>
  );

  return (
    <div>
      <ToastContainer />
      <h1>Enter Your Email To Reset Password</h1>
      {forgotPasswordForm()}
    </div>
  );
};
