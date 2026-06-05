import jwt from 'jsonwebtoken';

// Sign a JWT token

export const signToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Verify a JWT token

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
