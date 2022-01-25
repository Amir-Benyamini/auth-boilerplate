import mongoose, { Document } from "mongoose";

interface UserInput {
  name: string;
  email: string;
  _password: string;
  password: string;
}

export default interface UserDoc extends Document, UserInput {
  role: string;
  hashed_password: string | undefined;
  salt: string;
  resetPasswordLink: string;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Types.ObjectId;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}
