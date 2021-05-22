import express from "express";
import jwt from "jsonwebtoken";

var router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  if (req.session?.jwt) {
    const token = req.session.jwt;
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!);
      res.send({ currentuser: payload });
    } catch (err) {
      res.send({ currentuser: null });
    }
  } else {
    res.send({ currentuser: null });
  }
});

export { router as currentuserRouter };
