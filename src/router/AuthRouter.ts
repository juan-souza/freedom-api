import { Router } from 'express';
import AuthController from '../controllers/AuthController'


class UserRouter {

  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/', AuthController.authentication);
  }

}

const userRouter = new UserRouter();
export default userRouter.router;


