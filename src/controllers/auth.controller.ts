/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (!JWT_SECRET || !JWT_EXPIRES_IN) {
      throw new Error("JWT_SECRET is not defined");
    }
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
      throw new Error(`User with email ${email} doesn't exist`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid Password");
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
