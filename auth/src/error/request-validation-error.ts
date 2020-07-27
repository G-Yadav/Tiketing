import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public error: ValidationError[]) {
    super("Invalid request parameter");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.error.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
