import Joi from 'joi';
import { IRequestBodySignup, IRequestLogin } from '../types/request-body-types';
import { NextFunction, Request, Response } from 'express';

const validationOption = { errors: { wrap: { label: "" } }, abortEarly: false };

export const signupValidator = async (request: Request, response: Response, next: NextFunction) => {
  
  const payload: IRequestBodySignup = request.body

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
  })
  
  const {error} = schema.validate(payload, validationOption)
  
  if(!error){
    return next()
  }
  
  next(error)
}

export const loginValidator = async (request: Request, response: Response, next: NextFunction) => {
  
  const payload: IRequestLogin = request.body

  const schema = Joi.object({
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
  })

  const {error} = schema.validate(payload, validationOption);

  if(!error){
    return next()
  }
  
  next(error)
}
