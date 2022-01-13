"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async function () {
    const conn = await mongoose_1.default.connect(process.env.DB);
    console.log("DB is connected");
    // conn.connection.db.dropDatabase();
};
exports.default = connectDB;
