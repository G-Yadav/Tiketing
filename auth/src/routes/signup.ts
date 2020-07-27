import express, { Request, Response } from "express";
import { body, validationResult, ValidationError } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  (req: Request, res: Response) => {
    const error = validationResult(req);
    // console.log(error);
    if (!error.isEmpty()) throw new RequestValidationError(error.array());
    // throw new DatabaseConnectionError();
    throw new Error();
    res.send(JSON.stringify(error));
  }
);

export { router as signupRouter };
