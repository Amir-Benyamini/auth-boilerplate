import User from "./../db/userSchema";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import { Request, Response } from "express";
import UserDoc from "../interfaces/user";
import { CallbackError } from "mongoose";
import { sendEmailWithNodemailer } from "../services/email";
import _ from "lodash";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import axios from "axios";
axios.defaults;

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface Token {
  token: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface forgotPasswordInput {
  email: string;
}

interface ResetPasswordInputs {
  newPassword: string;
  resetPasswordLink: string;
}

interface GoogleTokenId {
  idToken: string;
}

interface FacebookTokenId {
  userID: string;
  accessToken: string;
}

interface FacebookUserData {
  id: string;
  name: string;
  email: string;
}

export const signup = (req: Request, res: Response) => {
  const { name, email, password }: SignupInput = req.body;

  User.findOne({ email }, (err: CallbackError, user: UserDoc) => {
    if (user) {
      return res.status(400).json({
        error: "email is taken!",
      });
    } else {
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION!,
        { expiresIn: "15m" }
      );

      const emailData = {
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Account activation link",
        html: `<h1>Please use the following link to activate your account</h1> 
				 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
				 <hr />
				 <p>This email may contain sensetive information.</p>
				 <p>${process.env.CLIENT_URL}</p>`,
      };
      sendEmailWithNodemailer(req, res, emailData);
    }
  });
};

export const accountActivation = (req: Request, res: Response) => {
  const { token }: Token = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION!,
      function (err, decoded) {
        if (err) {
          console.log("JWT ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expierd link. Please signup again.",
          });
        }
        //@ts-ignore
        const { name, email, password }: SignupInput = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err: CallbackError, user: UserDoc) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "Error saving user in DB. Try signup again.",
            });
          }
          return res.json({
            messaga: "Signup success! Please login.",
          });
        });
      }
    );
  } else {
    return res.json({
      messaga: "Something went wrong. Please try again.",
    });
  }
};

export const login = (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;

  User.findOne({ email }, (err: CallbackError, user: UserDoc) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Incorrect password. Please try again.",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

export const requireLogin = expressJwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
});

export const forgotPassword = (req: Request, res: Response) => {
  const { email }: forgotPasswordInput = req.body;
  User.findOne({ email }, (err: CallbackError, user: UserDoc) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please try again",
      });
    } else {
      const token = jwt.sign(
        { _id: user._id, name: user.name },
        process.env.JWT_RESET_PASSWORD!,
        { expiresIn: "15m" }
      );

      const emailData = {
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Password reset link",
        html: `<h1>Please use the following link to reset your password</h1> 
					 <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
					 <hr />
					 <p>This email may contain sensetive information.</p>
					 <p>${process.env.CLIENT_URL}</p>`,
      };
      return User.updateOne(
        { resetPasswordLink: token },
        (err: CallbackError, success: UserDoc) => {
          if (err) {
            console.log("RESET PASSWORD LINK ERROR", err);
            return res.status(400).json({
              error: "DB connection error on user forgot password",
            });
          } else {
            sendEmailWithNodemailer(req, res, emailData);
          }
        }
      );
    }
  });
};

export const resetPassword = (req: Request, res: Response) => {
  const { resetPasswordLink, newPassword }: ResetPasswordInputs = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD!,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: "Expired link, try again.",
          });
        }
        User.findOne(
          { resetPasswordLink },
          (err: CallbackError, user: UserDoc) => {
            if (err || !user) {
              return res.status(400).json({
                error: "Somthing went wrong, try again",
              });
            }
            const updatedFields = {
              password: newPassword,
              resetPasswordLink: "",
            };
            user = _.extend(user, updatedFields);
            user.save((err: CallbackError, result: UserDoc) => {
              if (err) {
                return res.status(400).json({
                  error: "Error reseting user password!",
                });
              }
              res.json({
                message: "Great! now you can login with your new password.",
              });
            });
          }
        );
      }
    );
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
  const { idToken }: GoogleTokenId = req.body;
  let response = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT!,
  });
  console.log("GOOGLE LOGIN RESPONSE", response);
  let verifiedToken = response.getPayload();
  if (verifiedToken) {
    const { email_verified, name, email }: TokenPayload = verifiedToken;
    if (email_verified) {
      User.findOne({ email }, (err: CallbackError, user: UserDoc) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "30D",
          });
          const { _id, name, email, role } = user;
          return res.json({
            token,
            user: { _id, name, email, role },
          });
        } else {
          let password = email + process.env.JWT_SECRET!;
          user = new User({ name, email, password });
          user.save((err: CallbackError, data: UserDoc) => {
            if (err) {
              console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
              return res.status(400).json({
                error: "User faild to save on google login.",
              });
            } else {
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET!,
                { expiresIn: "30D" }
              );
              const { _id, name, email, role } = data;
              return res.json({
                token,
                user: { _id, name, email, role },
              });
            }
          });
        }
      });
    } else {
      return res.status(400).json({
        error: "Google login faild, Please try again.",
      });
    }
  } else {
    return res.status(400).json({
      error: "Google login faild to verify, Please try again.",
    });
  }
};

export const facebookLogin = async (req: Request, res: Response) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken }: FacebookTokenId = req.body;
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  let userProfile = await axios.get(url);
  let userData: FacebookUserData = userProfile.data;
  if (userProfile) {
    const { email, name } = userData;
    User.findOne({ email }, (err: CallbackError, user: UserDoc) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: "30D",
        });
        const { _id, name, email, role } = user;
        return res.json({
          token,
          user: { _id, name, email, role },
        });
      } else {
        let password = email + process.env.JWT_SECRET!;
        user = new User({ name, email, password });
        user.save((err: CallbackError, data: UserDoc) => {
          if (err) {
            console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
            return res.status(400).json({
              error: "User faild to save on facebook login.",
            });
          }
          const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET!, {
            expiresIn: "30D",
          });
          const { _id, name, email, role } = data;
          return res.json({
            token,
            user: { _id, name, email, role },
          });
        });
      }
    });
  } else {
    res.json({
      error: "Facebook login failed, Please try again.",
    });
  }
};
