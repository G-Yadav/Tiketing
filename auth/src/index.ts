import mongoose from "mongoose";

import { app } from "./app";
import { DatabaseConnectionError } from "./error/database-connection-error";

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
