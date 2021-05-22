import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { NotFoundError } from "../error/not-found-error";
import { BadRequestError } from "../error/bad-request-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }

  return res.status(400).send({ error: [{ message: err.message }] });
};
