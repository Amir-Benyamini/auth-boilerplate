import React, { useState, useEffect } from "react";
import { activateAccount } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function Acivate() {
  const [values, setValues] = useState({
    token: "",
  });

  const { token } = values;
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    let token = params.token;
    console.log(token);

    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const onAccountActivation = async () => {
    let res = await activateAccount(token);
    if (res) {
      if (res.ok) {
        toast.success(`${JSON.parse(res.data).message}`);
        setTimeout(() => {
          navigate(`/`);
        }, 10000);
      } else {
        toast.error(JSON.parse(res.data).error);
      }
    }
  };

  const activationLink = () => (
    <div>
      <div>
        <h1 className="align-text">
          Please click the "activate account" button to activate your account!
        </h1>
      </div>
      <div className="center-row">
        <button
          className="btn btn-primary login-btn"
          onClick={onAccountActivation}
          color="primary"
        >
          <span className="h5">acivate account</span>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {activationLink()}
    </div>
  );
}
