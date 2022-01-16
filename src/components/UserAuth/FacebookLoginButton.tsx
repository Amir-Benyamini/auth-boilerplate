import React from "react";
//@ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginButton } from "react-social-login-buttons";
import { facebookLogin } from "../../actions/Auth";

export const FacebookLoginComp: React.FC = () => {
  const responseFacebook = (response: { accessToken: string }) => {
    //  if (response.accessToken) {
    //    console.log(response);
    //    facebookLogin(response.accessToken);
    //  } else {
    //    console.log(response);
    //  }
  };
  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_ID!}`}
        //@ts-ignore
        render={(renderProps) => (
          <FacebookLoginButton
            className="login-btn"
            align="center"
            onClick={renderProps.onClick}
          >
            <span>Login with Facebook</span>
          </FacebookLoginButton>
          //  <div
          //    className="fb-login-button login-btn"
          //    data-width="250"
          //    data-size="large"
          //    data-button-type="continue_with"
          //    data-layout="default"
          //    data-auto-logout-link="false"
          //    data-use-continue-as="true"
          //    onClick={renderProps.onClick}
          //  ></div>
        )}
        autoLoad={false}
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookLoginComp;
