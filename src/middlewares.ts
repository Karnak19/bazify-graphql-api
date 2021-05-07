import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error("no Authorization header found");

    const [bearer, token] = authorization.split(" ");

    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET as Secret);
      req.user = decoded as {
        username: string;
        iat: number;
        exp: number;
      };
      next();
    }
  } catch (error) {
    res.status(403);
    next(error);
  }
}
