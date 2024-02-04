import {NextFunction, Request, Response} from "express";
import {generateMd5Hash, responseTransformer} from "../utils";
import {marvelClient} from "../client/marvel-client";
import { RESPONSE_MESSAGE_CONSTANTS } from "../constants";

export const getMarvelCharactersController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = request.query.nameStartsWith;
    const limit = request.query.limit;
    const offset = request.query.offset;

    const currentTimestamp = Date.now();

    const apiHash = generateMd5Hash(
      `${currentTimestamp}${process.env.MARVEL_API_PRIVATE_KEY}${process.env.MARVEL_API_PUBLIC_KEY}`
    );

    const queryParams: any = {
      ts: currentTimestamp,
      apikey:  process.env.MARVEL_API_PUBLIC_KEY,
      hash: apiHash,
    }

    if(limit){
      queryParams.limit = limit
    }

    if(offset){
      queryParams.offset = offset
    }
    
    if(searchTerm){
      queryParams.nameStartsWith = searchTerm
      queryParams.limit = limit || 100
    }
    
    const characterList = await marvelClient.get(
      `/characters?${new URLSearchParams(queryParams).toString()}`
    );

    return response.status(200).json(
      responseTransformer(RESPONSE_MESSAGE_CONSTANTS.SUCCESS, {
        ...characterList.data.data,
      })
    );
  } catch (err) {
    next(err);
  }
};
