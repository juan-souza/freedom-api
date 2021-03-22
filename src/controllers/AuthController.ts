import {Request, Response} from 'express';
import {User} from "../entity/User";
import jwt from 'jsonwebtoken'
import Roles from "../entity/Roles";

// FIXME: refatorar(finalizar primeiro)
class AuthController {

  async authentication(req: Request, res: Response) {
    const {email, password} = req.body;

    if (!(email && password)) {
      res.status(400).send();
    }

    let user;

    try {
      user = await User.findOne({where: {email}})
    } catch (error) {
      res.status(401).send();
    }

    if (!user.isValidPassword(password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

    return res.json({
      auth: true,
      username: user.name,
      email: user.email,
      role: user.role,
      token
    })
  }

  // logout
  async logout(req: Request, res: Response) {
    res.json({auth: false, token: null});
  }

  // logout
  async register(req: Request, res: Response) {
    const {name, email, password, code} = req.body;
    const verifyRegisterCode = code === process.env.USER_REGISTER_CODE;

    if (!(name || email || password || verifyRegisterCode)) {
      res.status(400).send();
    }

    let user;
    try {
      user = await User.findOne({where: {email}})
    } catch (error) {
      res.status(401).send();
    }

    if (user) {
      res.status(400).send();
    } else {
      const userNew = new User();
      userNew.name = name;
      userNew.password = password;
      userNew.email = email;
      userNew.createDate = Date.now();
      userNew.role = Roles.GUEST;

      try {
        await userNew.save();
      } catch (error) {
        res.status(401).send();
      }

      res.json({success: true, email});
    }
  }

}

export default new AuthController();
