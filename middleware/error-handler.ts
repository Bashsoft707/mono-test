import ErrorResponse from "../utils/error-response";
import { Response } from "express";

export default function errorHandler(err: any, res: Response) {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message: any = Object.values(err.errors).map(
      (val: any) => val.message
    );
    error = new ErrorResponse(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
}
