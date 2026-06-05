import { Request } from 'express';
import { IUser } from './user.types.js';

export interface AuthRequest extends Request {
  user?: IUser;
}
