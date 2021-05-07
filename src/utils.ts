import { Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Form } from "multiparty";

export function asyncFormParse(
  req: Request
): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new Form();
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export function slugify(string: string) {
  return string.replace(/ /g, "-");
}

export async function checkToken(authorization: string) {
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

export async function mp3DurationString(
  durationInSeconds: number | undefined = 0
) {
  let ceiled = Math.ceil(durationInSeconds);
  const minutes = Math.floor(ceiled / 60);
  ceiled -= minutes / 60;
  const seconds = ceiled % 60;

  return `${minutes}:${seconds}`;
}
