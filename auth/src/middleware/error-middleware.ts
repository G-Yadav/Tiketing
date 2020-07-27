import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { NotFoundError } from "../error/not-found-error";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.send({ error: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.send({ error: err.serializeError() });
  }

  if (err instanceof NotFoundError) {
    return res.send({ error: err.serializeError() });
  }
};
