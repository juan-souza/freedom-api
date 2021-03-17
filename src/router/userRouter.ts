import {Router, Request, Response, NextFunction} from 'express';
import {User} from "../entity/User";
import {checkJwt} from "../middleware/checkJwt";
import {checkRole} from "../middleware/checkRole";

export class UserRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  // CREATE
  public async post(req: Request, res: Response, next: NextFunction) {
    const user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    await user.save();
    res.send(user);
  }

  // READ
  public async get(req: Request, res: Response, next: NextFunction) {
    const user = await User.find();
    res.send(user);
  }

  // READ SINGLE
  public async getId(req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({message: "User not found"})
    }
  }

  // UPDATE
  public async put(req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (user) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      await user.save();
      res.send(user);
    } else {
      res.status(404).send({message: "User not found"})
    }
  }

  // DELETE
  public async delete(req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (user) {
      await user.remove();
      res.send({message: 'User deleted'});
    } else {
      res.status(404).send({message: "User not found"})
    }
  }

  init() {
    //this.router.post('/',[checkJwt], this.post);
    //this.router.get('/', [checkJwt, checkRole([1])], this.get);
    this.router.get('/:id', this.getId);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }

}

const userRouter = new UserRouter();
userRouter.init();

export default userRouter.router;
