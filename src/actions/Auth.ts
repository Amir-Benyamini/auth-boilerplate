import authAPI from "../services/API";
import { authenticate } from "../services/authHelpers";

export const login = async (email: string, password: string) => {
  const response = await authAPI.emailLoginCall(email, password);
  if (response) {
    const data = await response.text();
    if (response.ok) {
      authenticate(JSON.parse(data), () => {
        console.log("Authenticate is done!");
      });
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await authAPI.emailSignupCall(name, email, password);
  if (response) {
    const data = await response.text();
    if (response.ok) {
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const activateAccount = async (token: string) => {
  const response = await authAPI.accountActivationCall(token);
  if (response) {
    const data = await response.text();
    if (response.ok) {
      console.log("Account activation success!", response);
      return { ok: true, data };
    } else {
      console.log("Account activation error!", response);
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const forgotPassword = async (email: string) => {
  const response = await authAPI.forgotPasswordCall(email);
  if (response) {
    console.log(response);
    const data = await response.text();
    if (response.ok) {
      console.log("Forgot password email success!", response);
      return { ok: true, data };
    } else {
      console.log("Forgot password email error!", response);
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await authAPI.resetPasswordCall(token, newPassword);
  if (response) {
    console.log(response);
    const data = await response.text();
    if (response.ok) {
      console.log("Reset password success!", response);
      return { ok: true, data };
    } else {
      console.log("Reset password error!", response);
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

// export const updateProfile = async (
//   name: string,
//   password: string,
//   token: string
// ) => {
//   const response = await authAPI.updateProfileCall(name, password, token);

//   if (response.ok) {
//     console.log("PROFILE UPDATE SUCCESS!", response);
//   }

//   return response;
// };

export const googleLogin = async (token: string) => {
  const response = await authAPI.googleLoginCall(token);
  if (response) {
    const data = await response.text();
    console.log(response);
    if (response.ok) {
      authenticate(JSON.parse(data), () => {
        console.log("Authenticate is done!");
      });
      console.log("Google login success!", response);
      return { ok: true, data };
    } else {
      console.log("Google login error!", response);
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const facebookLogin = async (userID: string, accessToken: string) => {
  const response = await authAPI.facebookLoginCall(userID, accessToken);
  if (response) {
    const data = await response.text();
    console.log(response);
    if (response.ok) {
      authenticate(JSON.parse(data), () => {
        console.log("Authenticate is done!");
      });
      console.log("Facebook login success!", response);
      return { ok: true, data };
    } else {
      console.log("Facebook login error!", response);
      return { ok: false, data };
    }
  } else {
    return response;
  }
};

export const loadUser = async (userId: string, token: string) => {
  let response = await authAPI.loadUserCall(userId, token);
  if (response) {
    let data = await response.json();
    if (response.ok) {
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return { ok: false, response };
  }
};

export const updateUser = async (
  token: string,
  name: string,
  password: string
) => {
  let response = await authAPI.updateUserCall(token, name, password);
  if (response) {
    let data = await response.json();
    if (response.ok) {
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return { ok: false, response };
  }
};
