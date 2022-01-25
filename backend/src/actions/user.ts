import User from "./../db/userSchema";
import { Request, Response } from "express";
import UserDoc from "../interfaces/user";
import { CallbackError } from "mongoose";

interface UserToken {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserInputBody {
  name: string;
  password: string;
  user: UserToken;
}

export const read = (req: Request, res: Response) => {
  const userId = req.params.id;
  User.findById(userId, (err: CallbackError, user: UserDoc) => {
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

export const update = (req: Request, res: Response) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body)
  const { name, password }: UserInputBody = req.body;
  //@ts-ignore
  User.findById(req.user._id, (err: CallbackError, user: UserDoc) => {
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
      } else {
        user.password = password;
      }
    }
    user.save((err: CallbackError, updatedUser: UserDoc) => {
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
