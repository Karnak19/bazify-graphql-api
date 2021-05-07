import dotenv from "dotenv";
import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { FileTypeResult } from "file-type/core";

dotenv.config();

export const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const secretAccessKey = process.env.AWS_SECRET_KEY;
export const Bucket = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});

export const s3 = new AWS.S3();

export function s3UploadFile(
  buffer: Buffer,
  name: string,
  type: FileTypeResult | undefined
) {
  if (!type) {
    throw new Error("Can't retrieve file type");
  }

  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  } as PutObjectRequest;

  console.log("starting upload to S3....");

  return s3.upload(params).promise();
}
