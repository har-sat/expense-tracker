import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


import User from "models/user.model.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/env.js";
import { CustomError } from "middlewares/error.middleware.js";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    //create new user
    const { username, email, password } = req.body;
    const existingUser = await User.find({ email });
    if (existingUser) {
      const error = new CustomError("User with email already exists");
      error.statusCode = 409;
      throw Error;
    }
    const newUser = await User.create(
      [
        {
          username,
          password: bcrypt.hash(password, 10),
          email,
        },
      ],
      { session }
    );
    // const token = jwt.sign({ userid: newUser[0] }, JWT_SECRET);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {};

export const signOut = (req: Request, res: Response, next: NextFunction) => {};
