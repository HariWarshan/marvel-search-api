import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils";
import { CustomError } from "../utils/custom-error";

export const tokenValidationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  try{
    const authToken = request.headers.authorization?.split(' ')
    const tokenType = authToken?.[0];
    const accessToken = authToken?.[1];
  
    if(!accessToken || tokenType!=='Bearer'){
      throw new CustomError('unauthorized', 401)
    }

    verifyAccessToken(accessToken)
    next();

  }catch(err){
    next(new CustomError("unauthorized", 401))
  }
}
