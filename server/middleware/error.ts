import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
	//using the default error handler in express 
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Wrong mongo id error
  if (err.name == "CastError") {
    const message = `Resource Not Found. Invalid Path name - ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Dublicate key error
  if (err.statusCode == 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT token
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expires
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is expired, please try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};