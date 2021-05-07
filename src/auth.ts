import express from "express";
import passport from "passport";
import jwt, { Secret } from "jsonwebtoken";

import prisma from "../prisma/client";

const router = express.Router();

router.get("/github", (req, res) =>
  passport.authenticate("github", {
    scope: ["profile", "email"],
    state: req.headers.referer,
  })(req, res)
);

router.get(
  "/github/cb",
  passport.authenticate("github", {
    failureRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    let user;

    if (!req.user) {
      throw new Error("no user !");
    }

    user = await prisma.user.findUnique({
      where: {
        pseudo: req.user.username,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          pseudo: req.user.username,
          isOAuth: true,
        },
      });
    }

    const token = jwt.sign(
      {
        username: user.pseudo,
      },
      process.env.SECRET as Secret,
      {
        expiresIn: "24h",
      }
    );

    res.redirect(
      `${req.query.state}?token=${token}&id=${user.id}&pseudo=${user.pseudo}`
    );
  }
);

export default router;
