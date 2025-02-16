import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not fount";
  }

  res.status(statusCode).send({
    success: false,
    message: message,
    stack: err.stack || "No stack found",
  });
  next();
};

export default errorMiddleware;
