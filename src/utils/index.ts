import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const generateSaltedHash = (password: string, salt: string) => {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return hashedPassword;
}

export const responseTransformer=function(message:string,data?:Object){
  return {
      message,
      data
  }
} 


export const generateAccessToken = (payload: {uuid: string; phone_number: string}) => {
  // [todo] : do a env check
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_VALUE as string)
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_VALUE as string)
}
