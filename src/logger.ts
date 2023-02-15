import { Request, Response, NextFunction } from 'express';

export const log = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`${Date.now()}: url: ${request.url}`);
  next();
};
