import { check } from "express-validator";

export const userSignupValidator = [
  check("name").notEmpty().withMessage("name is required!"),

  check("email").isEmail().withMessage("must be a valid email address!"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters!"),
];

export const userLoginValidator = [
  check("email").isEmail().withMessage("must be a valid email address!"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters!"),
];

export const forgotPasswordValidator = [
  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("must be a valid email address!"),
];

export const resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters!"),
];
