import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../model/user";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Invalid Password"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array());
    }

    const { email, password } = req.body;

    const alreadyUsed = await User.findOne({ email });
    if (alreadyUsed) {
      throw new Error("Email already exists");
    }

    const user = User.build({ email, password });
    await user.save();

    // creating json token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //storing it into session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
