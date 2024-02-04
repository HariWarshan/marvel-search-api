import { ErrorRequestHandler } from "express";
import Joi from "joi";

const parseErrorsFromJoi = (error: Joi.ValidationError) => {
  return error?.details?.map((each) => ({ field: each?.context?.label, message: each?.message })) || [];
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if(err.isJoi){
    
    const parsedError = parseErrorsFromJoi(err)
    const statusCode = 400

    res.status(statusCode).json({ error : {
      statusCode, message: "validation error", data: parsedError
    }});
  }else{
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: {
      statusCode,  message: err.message || 'Internal Server Error' 
    }});
  }
};
