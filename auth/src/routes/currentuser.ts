import express from "express";
var router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("User detail 10111");
});

export { router as currentuserRouter };
