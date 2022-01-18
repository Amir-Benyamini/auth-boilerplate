import React, { useState } from "react";
import { signup } from "../../actions/Auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const Signup: React.FC = () => {
  interface loginForm {
    name: string;
    email: string;
    password: string;
    passwordVisablity: boolean;
  }
  const [values, setValues] = useState<loginForm>({
    name: "",
    email: "",
    password: "",
    passwordVisablity: false,
  });
  const { name, email, password, passwordVisablity } = values;
  let navigate = useNavigate();

  const updateLoginInput = (value: string, name: string) => {
    const updatedValues: loginForm = { ...values };
    //@ts-ignore
    updatedValues[name] = value;
    setValues(updatedValues);
  };

  const onFormSubmit = async () => {
    const response = await signup(name, email, password);
    if (response) {
      if (response.ok) {
        toast.success(`${JSON.parse(response.data).message}`);
        setTimeout(() => {
          navigate(`/`);
        }, 10000);
      } else {
        toast.error(`${JSON.parse(response.data).error}`);
      }
    }
  };

  const togglePasswordVisablity = () => {
    const updatedValues = { ...values };
    updatedValues.passwordVisablity = !passwordVisablity;
    setValues(updatedValues);
  };

  const signupForm = () => (
    <form className="login-btn">
      <h1 className="center-row">Signup!</h1>
      <hr />
      <div className="form-group">
        <label className="label text-muted">Full name</label>
        <input
          required
          onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
          className="form-control"
          type="text"
          value={name}
          name="name"
        />
      </div>
      <div className="form-group">
        <label className="label text-muted">Email address</label>
        <input
          required
          onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
          className="form-control"
          type="text"
          value={email}
          name="email"
        />
      </div>
      <div className="form-group">
        <label className="label text-muted">Password</label>
        <input
          required
          onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
          className="form-control"
          type={passwordVisablity ? "text" : "password"}
          value={password}
          name="password"
          autoComplete="current-password"
        />
        <i
          onClick={togglePasswordVisablity}
          className={
            passwordVisablity
              ? "far fa-eye-slash text-muted eye-icon"
              : "far fa-eye text-muted eye-icon"
          }
        ></i>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          onFormSubmit();
        }}
        type="submit"
        className="btn btn-primary btn-block"
      >
        Signup
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
        <div className="form-frame">{signupForm()}</div>
      </div>
      <div className="foot"></div>
    </div>
  );
};
