import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  // Log error to console for dev environment
  console.error(err);

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new Error(message) as any;
    error.statusCode = 404;
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    const message = `Duplicate field value entered. Please try another value.`;
    error = new Error(message) as any;
    error.statusCode = 400;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors as object).map((val: any) => val.message).join(', ');
    error = new Error(message) as any;
    error.statusCode = 400;
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid authentication token. Please login again.';
    error = new Error(message) as any;
    error.statusCode = 401;
  }
  
  if (err.name === 'TokenExpiredError') {
    const message = 'Authentication token expired. Please login again.';
    error = new Error(message) as any;
    error.statusCode = 401;
  }

  // Send REST response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
};

export default errorHandler;
