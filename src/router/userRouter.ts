import { Router } from 'express';
import UserController from '../controllers/UserController'


class UserRouter {

  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/', UserController.insert);
    this.router.get('/', UserController.findAll);
    this.router.get('/:id', UserController.findById);
    this.router.put('/:id', UserController.update);
    this.router.delete('/:id', UserController.delete);
  }

}

const userRouter = new UserRouter();
export default userRouter.router;


