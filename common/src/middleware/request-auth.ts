import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../error/not-authorized-error";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
