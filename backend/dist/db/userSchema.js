"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
//userSchema
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: "subscriber",
    },
    resetPasswordLink: {
        data: String,
        default: "",
    },
}, { timestamps: true });
//virtual
userSchema
    .virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
})
    .get(function () {
    return this._password;
});
//methods
userSchema.methods = {
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password)
            return "";
        try {
            return crypto_1.default
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        }
        catch (err) {
            return "";
        }
    },
    makeSalt: function () {
        const num = Math.round(new Date().valueOf() * Math.random());
        const string = num.toString();
        return string;
    },
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
