import { NextFunction, Request, Response } from "express";
import { IRequestBodySignup, IRequestLogin } from "../types/request-body-types";
import AppDataSource from "../database";
import { UserModel } from "../database/entity/user.model";
import { generateAccessToken, generateSaltedHash, responseTransformer } from "../utils";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/custom-error";
import { ACCESS_TOKEN_EXPIRY, RESPONSE_MESSAGE_CONSTANTS } from "../constants";
import { QueryFailedError } from "typeorm";

export const signupController = async (request:Request, response:Response, next: NextFunction) => {
  try{

    const {
      email,
      name,
      password,
      phone_number
    } = request.body as unknown as IRequestBodySignup

    const userRepository = AppDataSource.getRepository(UserModel)

    await userRepository.save({
      uuid: uuidv4(),
      name,
      email,
      phone_number: phone_number,
      password: generateSaltedHash(password, process.env.PASSWORD_SALT_VALUE as string),
    })

    return response.status(201).json(responseTransformer(RESPONSE_MESSAGE_CONSTANTS.SUCCESS))

  }catch(err){

    // [todo] check if this is feasible with mysql    
    if(err instanceof QueryFailedError && err.driverError.routine==='_bt_check_unique'){
      return next(new CustomError(`account already exist with this phone number`, 409))
    }

    next(err)
  }
}


export const loginController = async (request:Request, response:Response, next: NextFunction) => {
  try{

    const {
      phone_number,
      password
    } = request.body as unknown as IRequestLogin

    const userRepository = AppDataSource.getRepository(UserModel)

    const currentUser = await userRepository.findOne({
      where: { phone_number }
    })
    
    if(!currentUser){
      throw new CustomError(`user with phone number ${phone_number}, doesn't exist`, 404)
    }

    const saltedHashPassword = generateSaltedHash(password, process.env.PASSWORD_SALT_VALUE as string)
    if(currentUser?.password !== saltedHashPassword){
      throw new CustomError("invalid password", 401)
    }

    const accessToken = generateAccessToken({
      uuid: currentUser.uuid, 
      phone_number: currentUser.phone_number
    })

    return response.status(200).json(responseTransformer(RESPONSE_MESSAGE_CONSTANTS.SUCCESS, {
      token_type: "Bearer",
      access_token: accessToken,
      expires_in: ACCESS_TOKEN_EXPIRY
    }))

  }catch(err){
    next(err)
  }
}
