import express from "express";
const authRouter = express.Router();
import {
  accountActivation,
  signup,
  login,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
} from "../actions/auth";
import { runValidation } from "./../validators/index";
import {
  userSignupValidator,
  userLoginValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
} from "./../validators/auth";

authRouter.post("/signup", userSignupValidator, runValidation, signup);

authRouter.post("/account-activation", accountActivation);

authRouter.post("/login", userLoginValidator, runValidation, login);

authRouter.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);

authRouter.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

authRouter.post("/google-login", googleLogin);

authRouter.post("/facebook-login", facebookLogin);

export default authRouter;
