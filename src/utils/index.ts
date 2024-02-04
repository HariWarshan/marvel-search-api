import crypto from "crypto";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_EXPIRY} from "../constants";

export const generateMd5Hash = (input: string) => {
  const md5 = crypto.createHash("md5");
  md5.update(input);
  return md5.digest("hex");
};

export const generateSaltedHash = (password: string, salt: string) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
};

export const responseTransformer = function (message: string, data?: Object) {
  return {
    message,
    data,
  };
};

export const generateAccessToken = (payload: {
  uuid: string;
  phone_number: string;
}) => {
  // [todo] : do a env check
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_VALUE as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_VALUE as string);
};
