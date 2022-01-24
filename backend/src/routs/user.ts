import express from "express";
import { read, update } from "../actions/user";
import { requireLogin } from "../actions/auth";

const userRouter = express.Router();

userRouter.get("/:id", requireLogin, read);
userRouter.put("/update", requireLogin, update);

export default userRouter;
