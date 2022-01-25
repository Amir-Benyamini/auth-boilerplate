"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookLogin = exports.googleLogin = exports.resetPassword = exports.forgotPassword = exports.requireLogin = exports.login = exports.accountActivation = exports.signup = void 0;
const userSchema_1 = __importDefault(require("./../db/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const email_1 = require("../services/email");
const lodash_1 = __importDefault(require("lodash"));
const google_auth_library_1 = require("google-auth-library");
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults;
const signup = (req, res) => {
    const { name, email, password } = req.body;
    userSchema_1.default.findOne({ email }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: "email is taken!",
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: "15m" });
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Account activation link",
                html: `<h1>Please use the following link to activate your account</h1> 
				 <p>${process.env.NODE_ENV === "production"
                    ? "https://user-auth-boilerplate.herokuapp.com"
                    : process.env.CLIENT_URL}/auth/activate/${token}</p>
				 <hr />
				 <p>This email may contain sensetive information.</p>
				 <p>${process.env.NODE_ENV === "production"
                    ? "https://user-auth-boilerplate.herokuapp.com"
                    : process.env.CLIENT_URL}</p>`,
            };
            (0, email_1.sendEmailWithNodemailer)(req, res, emailData);
        }
    });
};
exports.signup = signup;
const accountActivation = (req, res) => {
    const { token } = req.body;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
            if (err) {
                console.log("JWT ACCOUNT ACTIVATION ERROR", err);
                return res.status(401).json({
                    error: "Expierd link. Please signup again.",
                });
            }
            //@ts-ignore
            const { name, email, password } = jsonwebtoken_1.default.decode(token);
            const user = new userSchema_1.default({ name, email, password });
            user.save((err, user) => {
                if (err) {
                    console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
                    return res.status(401).json({
                        error: "Error saving user in DB. Try signup again.",
                    });
                }
                return res.json({
                    message: "Signup success! Please login.",
                });
            });
        });
    }
    else {
        return res.json({
            message: "Something went wrong. Please try again.",
        });
    }
};
exports.accountActivation = accountActivation;
const login = (req, res) => {
    const { email, password } = req.body;
    userSchema_1.default.findOne({ email }, (err, user) => {
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
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role },
        });
    });
};
exports.login = login;
exports.requireLogin = (0, express_jwt_1.default)({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
const forgotPassword = (req, res) => {
    const { email } = req.body;
    userSchema_1.default.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please try again",
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, { expiresIn: "15m" });
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Password reset link",
                html: `<h1>Please use the following link to reset your password</h1> 
					 <p>${process.env.NODE_ENV === "production"
                    ? "https://user-auth-boilerplate.herokuapp.com"
                    : process.env.CLIENT_URL}/auth/reset-password/${token}</p>
					 <hr />
					 <p>This email may contain sensetive information.</p>
					 <p>${process.env.NODE_ENV === "production"
                    ? "https://user-auth-boilerplate.herokuapp.com"
                    : process.env.CLIENT_URL}</p>`,
            };
            return userSchema_1.default.updateOne({ resetPasswordLink: token }, (err, success) => {
                if (err) {
                    console.log("RESET PASSWORD LINK ERROR", err);
                    return res.status(400).json({
                        error: "DB connection error on user forgot password",
                    });
                }
                else {
                    const response = (0, email_1.sendEmailWithNodemailer)(req, res, emailData);
                    return response;
                }
            });
        }
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    if (resetPasswordLink) {
        jsonwebtoken_1.default.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: "Expired link, try again.",
                });
            }
            userSchema_1.default.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: "Somthing went wrong, try again",
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: "",
                };
                user = lodash_1.default.extend(user, updatedFields);
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Error reseting user password!",
                        });
                    }
                    res.json({
                        message: "Great! now you can login with your new password.",
                    });
                });
            });
        });
    }
};
exports.resetPassword = resetPassword;
const googleLogin = async (req, res) => {
    const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT);
    const { idToken } = req.body;
    let response = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT,
    });
    console.log("GOOGLE LOGIN RESPONSE", response);
    let verifiedToken = response.getPayload();
    if (verifiedToken) {
        const { email_verified, name, email } = verifiedToken;
        if (email_verified) {
            userSchema_1.default.findOne({ email }, (err, user) => {
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: "30D",
                    });
                    const { _id, name, email, role } = user;
                    return res.json({
                        token,
                        user: { _id, name, email, role },
                    });
                }
                else {
                    let password = email + name + process.env.JWT_SECRET;
                    user = new userSchema_1.default({ name, email, password });
                    user.save((err, data) => {
                        if (err) {
                            console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                            return res.status(400).json({
                                error: "User faild to save on google login.",
                            });
                        }
                        else {
                            const token = jsonwebtoken_1.default.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "30D" });
                            const { _id, name, email, role } = data;
                            return res.json({
                                token,
                                user: { _id, name, email, role },
                            });
                        }
                    });
                }
            });
        }
        else {
            return res.status(400).json({
                error: "Google login faild, Please try again.",
            });
        }
    }
    else {
        return res.status(400).json({
            error: "Google login faild to verify, Please try again.",
        });
    }
};
exports.googleLogin = googleLogin;
const facebookLogin = async (req, res) => {
    console.log("FACEBOOK LOGIN REQ BODY", req.body);
    const { userID, accessToken } = req.body;
    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    let userProfile = await axios_1.default.get(url);
    let userData = userProfile.data;
    if (userProfile) {
        const { email, name } = userData;
        userSchema_1.default.findOne({ email }, (err, user) => {
            if (user) {
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "30D",
                });
                const { _id, name, email, role } = user;
                return res.json({
                    token,
                    user: { _id, name, email, role },
                });
            }
            else {
                let password = email + process.env.JWT_SECRET;
                user = new userSchema_1.default({ name, email, password });
                user.save((err, data) => {
                    if (err) {
                        console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                        return res.status(400).json({
                            error: "User faild to save on facebook login.",
                        });
                    }
                    const token = jsonwebtoken_1.default.sign({ _id: data._id }, process.env.JWT_SECRET, {
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
    }
    else {
        res.json({
            error: "Facebook login failed, Please try again.",
        });
    }
};
exports.facebookLogin = facebookLogin;
