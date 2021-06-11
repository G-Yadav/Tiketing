import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }

  return res.status(400).send({ error: [{ message: err.message }] });
};
