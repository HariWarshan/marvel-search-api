import { Router } from "express";
import { loginValidator, signupValidator } from "../middleware/request-body-validators";
import { loginController, signupController } from "../controller/auth-controller";

const authRouter: Router = Router();

authRouter.route('/signup').post(signupValidator, signupController)
authRouter.route('/login').post(loginValidator, loginController)

export default authRouter;
