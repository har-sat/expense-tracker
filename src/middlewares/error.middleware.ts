import { Request, Response, NextFunction } from "express";

import { ApiError } from "../types/error.js";
import mongoose from "mongoose";
import { MongoNetworkError } from "mongodb";

/*

DUPLICATION ERROR DOESN'T WORK

PLEASE FIX IT 🙏🏼

FWEAH
¥€

*/

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.log(err);
  let statusCode = err.statusCode;
  let errorType = err.errorType;
  let message = err.message || "Internal Server Error";
  let details: unknown;

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorType = "ValidationError";
    message = "Validation Error";
    details = err.message.split(", ");
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    errorType = "CastError";
    message = `Invalid ${err.path} : ${err.value}`;
  } else if (err instanceof mongoose.mongo.MongoServerError) {
    if (err.code === 11000) {
      statusCode = 409;
      errorType = "DuplicateKeyError";
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      message = `Duplicate value: ${field} with value: ${value}`;
    }
  } else if (err instanceof mongoose.Error.VersionError) {
    statusCode = 409;
    errorType = "VersionError";
    message = "Document has been modified by another process";
  } else if (err instanceof MongoNetworkError) {
    statusCode = 503;
    errorType = "ConnectionError";
    message = "Database Connection Error";
  }

  console.log("ERROR HAS OCCURED");
  console.log(`[${errorType}] ${statusCode}`);
  console.log(`${details}`);

  res.status(statusCode).json({
    sucess: false,
    errorType,
    message,
    details,
  });
};

export default errorMiddleware;
