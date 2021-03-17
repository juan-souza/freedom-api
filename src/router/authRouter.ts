import {Router, Request, Response, NextFunction} from 'express';
import {User} from "../entity/User";
import jwt from 'jsonwebtoken'
import {checkJwt} from "../middleware/checkJwt";

export class AuthRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  // login
  public async login(req: Request, res: Response, next: NextFunction) {
    // Check if username and password are set
    const {username, password} = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    let user;
    // Get user from database
    try {
      user = await User.findOne({
        where: {
          email: req.params.email,
          password: req.params.password
        }
      });
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
/*    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }*/

    // Sing JWT, valid for 1 hour
    const token = jwt.sign(
      {username: user.name, email: user.email},
      process.env.SECRET,
      {expiresIn: "1h"}
    );

    // Send the jwt in the response
    res.send({auth: true, token});
  }

  // logout
  public async logout(req: Request, res: Response, next: NextFunction) {
    res.json({auth: false, token: null});
  }

  // changePassword
  public async changePassword(req: Request, res: Response, next: NextFunction) {
    // Get ID from JWT
    /*  const id = res.locals.jwtPayload.userId;

      //Get parameters from the body
      const {oldPassword, newPassword} = req.body;
      if (!(oldPassword && newPassword)) {
        res.status(400).send();
      }

      //Get user from the database
      const userRepository = getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      }

      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }

      //Validate de model (password lenght)
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Hash the new password and save
      user.hashPassword();
      userRepository.save(user);

      res.status(204).send();*/
  }

  init() {
    this.router.post("/login", this.login);
    this.router.post("/logout", this.logout);
    // this.router.post("/change-password", [checkJwt], this.changePassword);
  }

}

const authRouter = new AuthRouter();
authRouter.init();

export default authRouter.router;
