import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: Record<string, any>;
  keyValue?: Record<string, any>;
}

const ErrorResponses = {
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid input data"
  },
  NOT_FOUND: {
    statusCode: 404,
    message: "Resource not found"
  },
  DUPLICATE_ERROR: {
    statusCode: 409,
    message: "Duplicate resource found"
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Authentication required"
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "Access forbidden"
  }
} as const;

const errorMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors: Record<string, any> = {};

  switch (err.name) {
    case "ValidationError":
      statusCode = ErrorResponses.VALIDATION_ERROR.statusCode;
      message = ErrorResponses.VALIDATION_ERROR.message;
      errors = err.errors || {};
      break;

    case "CastError":
      statusCode = ErrorResponses.NOT_FOUND.statusCode;
      message = ErrorResponses.NOT_FOUND.message;
      break;

    case "MongoServerError":
      if (err.code === "11000") { 
        statusCode = ErrorResponses.DUPLICATE_ERROR.statusCode;
        message = ErrorResponses.DUPLICATE_ERROR.message;
        errors = err.keyValue || {};
      }
      break;

    case "JsonWebTokenError":
    case "TokenExpiredError":
      statusCode = ErrorResponses.UNAUTHORIZED.statusCode;
      message = ErrorResponses.UNAUTHORIZED.message;
      break;
  }

  const errorResponse = {
    success: false,
    message,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      details: err
    })
  };

  if (process.env.NODE_ENV !== "production") {
    console.error(`[Error] ${message}`, {
      statusCode,
      path: req.path,
      method: req.method,
      body: req.body,
      error: err
    });
  }

  res.status(statusCode).json(errorResponse);
};

export default errorMiddleware;