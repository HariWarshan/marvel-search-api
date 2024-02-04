import { ErrorRequestHandler, NextFunction } from "express";
import Joi from "joi";

const parseErrorsFromJoi = (error: Joi.ValidationError) => {
  return error?.details?.map((each) => ({ field: each?.context?.label, message: each?.message })) || [];
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if(err.isJoi){
    const parsedError = parseErrorsFromJoi(err)
    res.status(400).json({ error: parsedError });
  }else{
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
  }
};
