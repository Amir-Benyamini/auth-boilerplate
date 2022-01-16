import React, { useState, useEffect } from "react";
// import { activateAccount } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
//@ts-ignorets-ignore
export function Acivate({ match }) {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  const { name, token, show } = values;

  useEffect(() => {
    let token = match.params.token;
    console.log(token);
    //@ts-ignorets-ignore
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const onAccountActivation = async () => {
    //  let res = await activateAccount(token);
    //  if (res.ok) {
    //    let data = await res.text();
    //    setValues({ ...values, show: !show });
    //    toast.success(JSON.parse(data).messaga);
    //  }
    //  if (!res.ok) {
    //    let data = await res.text();
    //    toast.error(JSON.parse(data).error);
    //  }
  };

  const activationLink = () => (
    <div>
      <h1>
        Hey {name}, please click the "activate account" button to activate your
        account!
      </h1>
      <button onClick={onAccountActivation} color="primary">
        acivate account
      </button>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {activationLink()}
    </div>
  );
}
