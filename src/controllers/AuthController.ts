import {Request, Response} from 'express';
import {User} from "../entity/User";
import jwt from 'jsonwebtoken'
import Roles from "../entity/Roles";

// FIXME: refatorar(finalizar primeiro)
class AuthController {

  async authentication(req: Request, res: Response) {
    const {email, password} = req.body;

    if (!(email && password)) {
      return res.status(400).json({message: 'Email or password is incorrect'})
    }

    const user = await User.findOne({where: {email}})

    if (!user) {
      return res.status(401).json({message: 'Email or password is incorrect'})
    }

    if (!user.isValidPassword(password)) {
      return res.status(401).json({message: 'Email or password is incorrect'})
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, `${process.env.ACCESS_TOKEN}`, {expiresIn: '1h'})

    return res.json({
      username: user.name,
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
     return res.status(400).send();
    }

    const user = await User.findOne({where: {email}});

    if (user) {
      return res.status(400).json({message: 'Email address is registered!'})
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
        return res.status(401).json({message: 'Error, Is not possible to save the user, try again!'})
      }

      return res.json({success: true, email});
    }
  }

}

export default new AuthController();
