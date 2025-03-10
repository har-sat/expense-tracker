import { JWT_SECRET } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";

/* Modify the request type to add properties like user etc.. */
//FIX .d.ts
const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).send({ message: "No Token Provided" });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById((decoded as JwtPayload).userId);

    (req as any).user = user;
    next();
  } catch (error: unknown) {
    console.log(error);
    res
      .status(401)
      .send({ message: "Unauthorized", error: (error as Error).message });
  }
};

export default authorize;
