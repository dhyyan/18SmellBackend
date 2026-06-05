import { Request } from 'express';
import { IUser } from './user.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface AuthRequest extends Request {}
