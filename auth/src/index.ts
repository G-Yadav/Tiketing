import express from "express";
import bodyParser from "body-parser";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/currentUser";
import { errorMiddleware } from "./middleware/error-middleware";

var app = express();
app.use(bodyParser.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentuserRouter);

app.use(errorMiddleware);
app.listen("3000", () => {
  console.log("App is listening on port 3000");
});
