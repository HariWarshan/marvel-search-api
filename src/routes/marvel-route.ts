import { Router } from "express";
import { getMarvelCharactersController } from "../controller/marvel-controller";
import { tokenValidationMiddleware } from "../middleware/token-validation-middleware";

const marvelRouter: Router = Router();

marvelRouter.route('/').get(tokenValidationMiddleware, getMarvelCharactersController)

export default marvelRouter;
