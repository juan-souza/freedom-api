import {Request, Response} from 'express';
import {User} from "../entity/User";
import jwt from 'jsonwebtoken'
import Roles from "../entity/Roles";


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

    const token = jwt.sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

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
    const {name,email, password, code} = req.body;
    const verifyRegisterCode = code === 'novouser2021'

    if (!(name || email || password || verifyRegisterCode)) {
      console.log('error')
      res.status(400).send();
    }

    /*
     validar se email ja existe ou setar email como unique.
    */

    const user = new User();
    user.name = name;
    user.password = password;
    user.email = email;
    // user.createDate = Date.now();
    user.role = Roles.GUEST;

    try {
      await user.save();
    } catch (error) {
      console.log(error)
      res.status(401).send();
    }

    res.json({success: true, username: name});
  }

}

export default new AuthController();
