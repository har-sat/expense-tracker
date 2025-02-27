/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ApiError } from "../types/error.js";

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const newUsers = await User.create([
      { username, email, password: await bcrypt.hash(password, 10) },
    ]);

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRES_IN),
    });

    res.status(201).json({
      success: true,
      message: "New User Created Succesfully",
      data: { user: newUsers[0], token },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new ApiError(
        `User with email:${email} doens't exist`,
        404,
        "ClientError"
      );
      throw error;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new ApiError("Invalid Password", 401, "ClientError");
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRES_IN),
    });

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    route: "sign-in",
  });
};
