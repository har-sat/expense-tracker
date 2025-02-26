import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.send("auth middleware running");
  next();
};

export default authMiddleware;