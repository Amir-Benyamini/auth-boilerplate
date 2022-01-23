import React from "react";
import { googleLogin } from "../../actions/Auth";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleLoginComp: React.FC = () => {
  const navigate = useNavigate();
  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response) {
      console.log(response.tokenId);
      const data = await googleLogin(response.tokenId);
      if (data) {
        if (data.ok) {
          toast.success(`Google login success! you will now enter the app.`);
          setTimeout(() => {
            navigate(`/`);
          }, 8000);
        } else {
          toast.error(JSON.parse(data.data).error);
        }
      } else {
        toast.error(`Google login server request error! please try again`);
      }
    } else {
      console.log(response);
      toast.error(
        `Google login failed to authenticate user on google! please try again`
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT!}`}
        render={(renderProps) => (
          <GoogleLoginButton
            className="login-btn"
            align="center"
            onClick={renderProps.onClick}
          >
            <span>Login with Google</span>
          </GoogleLoginButton>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginComp;
