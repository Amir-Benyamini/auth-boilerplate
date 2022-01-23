import React, { useState, useEffect } from "react";
import { resetPassword } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function ResetPassword() {
  const [values, setValues] = useState({
    token: "",
    newPassword: "",
  });

  const { token, newPassword } = values;
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    let token = params.token;
    console.log(token);

    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const updateInput = (value: string, name: string) => {
    const updatedValues = { ...values };
    //@ts-ignore
    updatedValues[name] = value;
    setValues(updatedValues);
  };
  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    let response = await resetPassword(token, newPassword);
    if (response) {
      if (response.ok) {
        toast.success(`${JSON.parse(response.data).message}`);
        setTimeout(() => {
          navigate(`/`);
        }, 8000);
      } else {
        toast.error(JSON.parse(response.data).error);
      }
    }
  };

  const resetPasswordForm = () => (
    <form className="login-btn">
      <h1 className="center-row">Reset Password</h1>
      <hr />
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

      <button className="btn btn-primary btn-block" onClick={onFormSubmit}>
        Update Password
      </button>
    </form>
  );

  return (
    <div id="grid-container">
      <ToastContainer />
      <div className="head"></div>
      <div className="main center-col">
        <div className="form-frame">{resetPasswordForm()}</div>
      </div>
      <div className="foot"></div>
    </div>
  );
}
