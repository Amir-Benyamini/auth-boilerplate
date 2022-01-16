"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.forgotPasswordValidator = exports.userLoginValidator = exports.userSignupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.userSignupValidator = [
    (0, express_validator_1.check)("name").notEmpty().withMessage("name is required!"),
    (0, express_validator_1.check)("email").isEmail().withMessage("must be a valid email address!"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters!"),
];
exports.userLoginValidator = [
    (0, express_validator_1.check)("email").isEmail().withMessage("must be a valid email address!"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters!"),
];
exports.forgotPasswordValidator = [
    (0, express_validator_1.check)("email")
        .isEmail()
        .notEmpty()
        .withMessage("must be a valid email address!"),
];
exports.resetPasswordValidator = [
    (0, express_validator_1.check)("newPassword")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters!"),
];
