import {Request, Response} from 'express';
import {User} from "../entity/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


class AuthController {

  async authentication(req: Request, res: Response) {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}})
    const isValidPassword = await bcrypt.compare(password, user.password)


    if (!isValidPassword) {
      return res.sendStatus(401);
    }


    const token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN, {expiresIn: '12h'})

    return res.json({
      user,
      token
    })
  }

  // login
  async login(req: Request, res: Response) {
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
  async logout(req: Request, res: Response) {
    res.json({auth: false, token: null});
  }

  // changePassword
  async changePassword(req: Request, res: Response) {
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

}

export default new AuthController();
