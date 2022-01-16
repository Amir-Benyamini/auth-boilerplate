import React, { useState } from "react";
import { login } from "../../actions/Auth";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
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
    //  const response = await login(email, password);
    //  if (response === "OK") {
    //    navigate(`/`);
    //  } else {
    //    console.log(response);
    //    alert(`Error: "${response}", please try again.`);
    //  }
  };

  const togglePasswordVisablity = () => {
    const updatedValues = { ...values };
    updatedValues.passwordVisablity = !passwordVisablity;
    setValues(updatedValues);
  };

  const loginForm = () => (
    <form className="login-btn">
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
  return <div>{loginForm()}</div>;
};
