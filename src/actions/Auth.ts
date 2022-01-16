import authAPI from "../services/API";

export const login = async (email: string, password: string) => {
  //   const response = await authAPI.emailLoginCall(email, password);
  //   if (response.ok) {
  //     console.log("lOGIN SUCCESS!", response);
  //   }
  //   return response;
};

export const signup = async (name: string, email: string, password: string) => {
  //   const response = await authAPI.emailSignupCall(name, email, password);
  //   if (response.ok) {
  //     console.log("SIGNUP SUCCESS!", response);
  //   }
  //   return response;
};

export const activateAccount = async (token: string) => {
  //   const response = await authAPI.accountActivationCall(token);
  //   if (response.ok) {
  //     console.log("lOGIN SUCCESS!", response);
  //   }
  //   return response;
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

// export const forgotPassword = async (email: string) => {
//   const response = await authAPI.forgotPassword(email);

//   if (response.ok) {
//     console.log("FORGOT PASSWORD SUCCESS!", response);
//   }

//   return response;
// };

// export const resetPassword = async (newPassword: string, token: string) => {
//   const response = await authAPI.resetPassword(newPassword, token);

//   if (response.ok) {
//     console.log("FORGOT PASSWORD SUCCESS!", response);
//   }

//   return response;
// };

export const googleLogin = async (token: string) => {
  //   const response = await authAPI.googleLogin(token);
  //   if (response.ok) {
  //     console.log("GOOGLE LOGIN SUCCESS!", response);
  //   }
  //   return response;
};

export const facebookLogin = async (userID: string, accessToken: string) => {
  //   const response = await authAPI.facebookLogin(userID, accessToken);
  //   if (response.ok) {
  //     console.log("FACEBOOK LOGIN SUCCESS!", response);
  //   }
  //   return response;
};

// export const loadProfile = async (userId: string, token: string) => {
//   let res = await authAPI.loadProfile(userId, token);
//   return res;
// };
