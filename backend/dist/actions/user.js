"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.read = void 0;
const userSchema_1 = __importDefault(require("./../db/userSchema"));
const read = (req, res) => {
    const userId = req.params.id;
    userSchema_1.default.findById(userId, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        user.hashed_password = undefined;
        user.salt = "";
        res.json(user);
    });
};
exports.read = read;
const update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body)
    const { name, password } = req.body;
    //@ts-ignore
    userSchema_1.default.findById(req.user._id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        if (!name && !password) {
            return res.status(400).json({
                error: "Name and password is required",
            });
        }
        if (name) {
            user.name = name;
        }
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: "Password should be at least 6 characters",
                });
            }
            else {
                user._password = password;
            }
        }
        user.save((err, updatedUser) => {
            if (err) {
                console.log("User update error", err);
                return res.status(400).json({
                    error: "User update failed",
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = "";
            res.json(updatedUser);
        });
    });
};
exports.update = update;
