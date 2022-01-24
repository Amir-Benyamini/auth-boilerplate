"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = void 0;
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const initializeRoutes = (app) => {
    app.use("/auth", auth_1.default);
    app.use("/user", user_1.default);
};
exports.initializeRoutes = initializeRoutes;
