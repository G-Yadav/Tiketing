import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/currentuser";
import { errorHandler } from "./middleware/error-middleware";
import { DatabaseConnectionError } from "./error/database-connection-error";
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to databases");
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }

  app.listen("3000", () => {
    console.log("App is listening on port 3000!!");
  });
};

start();
