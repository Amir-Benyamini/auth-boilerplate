import React, { useState, useEffect } from "react";
import { resetPassword } from "../../actions/Auth";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";

export const ResetPassword = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
  });

  useEffect(() => {
    let token = match.params.token;
    const { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  //   const updateLoginInput = (value, name) => {
  //     const updatedValues = { ...values };
  //     updatedValues[name] = value;
  //     setValues(updatedValues);
  //   };
  //   const resetForm = (buttonText) => {
  //     setValues({ ...values, newPassword: "", buttonText });
  //   };

  const onFormSubmit = async (event) => {
    //  event.preventDefault();
    //  setValues({ ...values, buttonText: "Resetting..." });
    //  let res = await resetPassword(newPassword, token);
    //  let data = await res.json();
    //  if (res.ok) {
    //    resetForm("Reset Password");
    //    toast.success(data.message);
    //  }
    //  if (!res.ok) {
    //    resetForm("Submit");
    //    toast.error(data.error);
    //  }
  };

  const resetPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="label text-muted">New Password</label>
        <input
          required
          onChange={(e) => updateInput(e.target.value, e.target.name)}
          className="form-control"
          type="text"
          value={newPassword}
          name="newPassword"
        />
      </div>

      <button onClick={onFormSubmit}>Reset Passord</button>
    </form>
  );

  return (
    <div>
      <ToastContainer />
      <h1>{`Hey ${name}, please Reset Password.`}</h1>
      {resetPasswordForm()}
    </div>
  );
};
