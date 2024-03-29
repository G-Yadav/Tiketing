import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/currentuser";
import { errorHandler } from "./middleware/error-middleware";
import { NotFoundError } from "./error/not-found-error";

var app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentuserRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };