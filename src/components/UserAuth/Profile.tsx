import React, { useState, useEffect } from "react";
import { loadUser, updateUser } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, getCookie } from "../../services/authHelpers";
export const Profile: React.FC = () => {
  interface updateForm {
    newName: string;
    newPassword: string;
    passwordVisablity: boolean;
  }

  interface userDetails {
    name: string;
    role: string;
    email: string;
    informChange: boolean;
  }
  const [values, setValues] = useState<updateForm>({
    newName: "",
    newPassword: "",
    passwordVisablity: false,
  });

  const [detailesValues, setDetailesValues] = useState<userDetails>({
    name: "",
    role: "",
    email: "",
    informChange: false,
  });

  const { newName, newPassword, passwordVisablity } = values;
  const { name, role, email, informChange } = detailesValues;

  useEffect(() => {
    const user = isAuth();
    if (user) {
      const token = getCookie("token");
      (async () => {
        const response = await loadUser(user._id, token!);
        if (response) {
          if (response.ok) {
            const { email, name, role } = response.data;
            setDetailesValues({ ...detailesValues, email, name, role });
          } else {
            toast.error(`${response.data.error}`);
          }
        } else {
          toast.error("Failed when request user details from server!");
        }
      })();
    } else {
      toast.error("User not loged in!");
    }
  }, [informChange]);
  const updateInput = (value: string, name: string) => {
    const updatedValues: updateForm = { ...values };
    //@ts-ignore
    updatedValues[name] = value;
    setValues(updatedValues);
  };
  const postUpdate = () => {
    setDetailesValues({ ...detailesValues, informChange: !informChange });
    setValues({
      newName: "",
      newPassword: "",
      passwordVisablity: false,
    });
  };
  const onFormSubmit = async () => {
    const user = isAuth();
    if (user) {
      const token = getCookie("token");
      const response = await updateUser(token!, newName, newPassword);
      if (response.ok) {
        postUpdate();
        toast.success(`Profile updated successfully!`);
      } else {
        toast.error(`Profile updated failed!`);
      }
    } else {
      toast.error(`User authorization error!`);
    }

    //  const response = await signup(name, email, password);
    //  if (response) {
    //    if (response.ok) {
    //      toast.success(`${JSON.parse(response.data).message}`);
    //      setTimeout(() => {
    //        navigate(`/`);
    //      }, 10000);
    //    } else {
    //      toast.error(`${JSON.parse(response.data).error}`);
    //    }
    //  }
  };

  const togglePasswordVisablity = () => {
    const updatedValues = { ...values };
    updatedValues.passwordVisablity = !passwordVisablity;
    setValues(updatedValues);
  };

  const updateForm = () => (
    <form className="login-btn">
      <h1 className="center-row">Profile Update:</h1>
      <hr />
      <div className="form-group">
        <label className="label text-muted">Full name</label>
        <input
          required
          onChange={(e) => updateInput(e.target.value, e.target.name)}
          className="form-control"
          type="text"
          value={newName}
          name="newName"
        />
      </div>

      <div className="form-group">
        <label className="label text-muted">Password</label>
        <input
          required
          onChange={(e) => updateInput(e.target.value, e.target.name)}
          className="form-control"
          type={passwordVisablity ? "text" : "password"}
          value={newPassword}
          name="newPassword"
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
        Update
      </button>
    </form>
  );
  return (
    <div id="grid-container">
      <ToastContainer />
      <div className="head"></div>
      <div className="main center-col">
        <div className="form-frame userDetails">
          <h3 className="center-row">User Details:</h3>
          <hr />
          <h6>User Name: {name}</h6>
          <h6>Email: {email}</h6>
          <h6>User Name: {role}</h6>
        </div>
        <div className="form-frame">{updateForm()}</div>
      </div>
      <div className="foot"></div>
    </div>
  );
};
