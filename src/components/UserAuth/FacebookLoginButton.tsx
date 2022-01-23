import React from "react";
//@ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginButton } from "react-social-login-buttons";
import { facebookLogin } from "../../actions/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FacebookLoginComp: React.FC = () => {
  const navigate = useNavigate();
  const responseFacebook = async (facebookResponse: {
    accessToken: string;
    userID: string;
  }) => {
    if (facebookResponse.accessToken && facebookResponse.userID) {
      console.log(facebookResponse);
      const response = await facebookLogin(
        facebookResponse.userID,
        facebookResponse.accessToken
      );
      if (response) {
        if (response.ok) {
          toast.success(`Facebook login success! you will now enter the app.`);
          setTimeout(() => {
            navigate(`/`);
          }, 8000);
        } else {
          toast.error(JSON.parse(response.data).error);
        }
      }
    } else {
      console.log(facebookResponse);
    }
  };
  return (
    <div>
      <ToastContainer />
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID!}`}
        //@ts-ignore
        render={(renderProps) => (
          <FacebookLoginButton
            className="login-btn"
            align="center"
            onClick={renderProps.onClick}
          >
            <span>Login with Facebook</span>
          </FacebookLoginButton>
        )}
        autoLoad={false}
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookLoginComp;
