import React from "react";
import { googleLogin } from "../../actions/Auth";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GoogleLoginButton } from "react-social-login-buttons";

const GoogleLoginComp: React.FC = () => {
  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response) {
      console.log(response);
      let data = googleLogin(response.tokenId);
      console.log(data);
    } else {
      console.log(response);
    }
  };

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT!}`}
      render={(renderProps) => (
        //   <MyGoogleLoginButton />
        <GoogleLoginButton
          className="login-btn"
          align="center"
          onClick={renderProps.onClick}
        >
          <span>Login with Google</span>
        </GoogleLoginButton>
        //   <GoogleButton
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //     className="login-btn"
        //     label="Continue With Google"
        //   />
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginComp;
