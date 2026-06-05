import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwtService.js';
import { userRepository } from '../repositories/index.js';
import { IUser } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: IUser;
}

// Protect routes - Verify JWT
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.',
    });
  }

  try {
    // Verify token
    const decoded: any = verifyToken(token);

    // Get user from database (excluding password field)
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // Grant access to protected route
    req.user = user as IUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Invalid token.',
    });
  }
};

// Restrict access to admin role only
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Admin privileges required.',
    });
  }
};
