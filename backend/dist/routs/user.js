"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../actions/user");
const auth_1 = require("../actions/auth");
const userRouter = express_1.default.Router();
userRouter.get("/:id", auth_1.requireLogin, user_1.read);
userRouter.put("/update", auth_1.requireLogin, user_1.update);
exports.default = userRouter;
