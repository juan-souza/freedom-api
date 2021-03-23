import {Router} from 'express';
import AuthController from '../controllers/AuthController';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/login', AuthController.authentication);
    this.router.post('/logout', AuthController.logout);
    this.router.post('/register', AuthController.register);
  }
}

const userRouter = new UserRouter();
export default userRouter.router;
