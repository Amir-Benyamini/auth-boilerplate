import React, { useState } from "react";
import { login } from "../../actions/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const LoginForm: React.FC = () => {
  interface loginForm {
    email: string;
    password: string;
    passwordVisablity: boolean;
  }
  const [values, setValues] = useState<loginForm>({
    email: "",
    password: "",
    passwordVisablity: false,
  });
  const { email, password, passwordVisablity } = values;
  let navigate = useNavigate();
  const updateLoginInput = (value: string, name: string) => {
    const updatedValues: loginForm = { ...values };
    //@ts-ignore
    updatedValues[name] = value;
    setValues(updatedValues);
  };
  const onFormSubmit = async () => {
    const response = await login(email, password);

    if (response) {
      if (response.ok) {
        toast.success(
          `Login success! Welcome back ${JSON.parse(response.data).user.name}.`
        );
        setTimeout(() => {
          navigate(`/`);
        }, 8000);
      } else {
        toast.error(`${JSON.parse(response.data).error}.`);
      }
    } else {
      toast.error(`Login failed, please try again later.`);
    }
  };

  const togglePasswordVisablity = () => {
    const updatedValues = { ...values };
    updatedValues.passwordVisablity = !passwordVisablity;
    setValues(updatedValues);
  };

  const loginForm = () => (
    <form className="login-btn">
      <div className="form-group"></div>
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
        Login
      </button>
    </form>
  );
  return (
    <div>
      <ToastContainer />
      {loginForm()}
    </div>
  );
};
