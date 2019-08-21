import { Router } from 'express';
import validate from 'express-validation';
import { authLocal } from "../../services/auth.services";
import userValidation from './user.validations';
import * as userController from './user.controllers';

const routes = new Router();

routes.post('/signup', validate(userValidation), userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;