import mongoose from "mongoose";
import crypto from "crypto";
import UserDoc from "../interfaces/user";
//userSchema
const Schema = mongoose.Schema;

const userSchema = new Schema<UserDoc>(
  {
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
  },
  { timestamps: true }
);

//virtual
userSchema
  .virtual("password")
  .set(function (this: UserDoc, password: string) {
    this._password = password;
    this.salt = this.makeSalt(); 
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: UserDoc) {
    return this._password;
  });
//methods
userSchema.methods = {
  authenticate: function (this: UserDoc, password: string) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword: function (this: UserDoc, password: string) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    const num = Math.round(new Date().valueOf() * Math.random());
    const string = num.toString();
    return string;
  },
};
const User = mongoose.model<UserDoc>("User", userSchema);

export default User;
