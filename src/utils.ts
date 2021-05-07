import jwt, { Secret } from "jsonwebtoken";

export default async function checkToken(authorization: string) {
  if (!authorization) throw new Error("no Authorization header found");
  const [bearer, token] = authorization.split(" ");

  if (bearer === "Bearer" && token) {
    const decoded = jwt.verify(token, process.env.SECRET as Secret);
    return decoded as {
      username: string;
      iat: number;
      exp: number;
    };
  }
}
