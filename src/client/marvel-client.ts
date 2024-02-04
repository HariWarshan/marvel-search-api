import axios from "axios";

export const marvelClient = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
});

