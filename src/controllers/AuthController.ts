import {Request, Response} from 'express';
import {User} from '../entity/User';
import jwt from 'jsonwebtoken';
import Roles from '../entity/Roles';
import {StatusCodes} from 'http-status-codes';

class AuthController {
  async authentication(req: Request, res: Response) {
    const {email, password} = req.body;

    if (!(email && password)) {
      res
        .status(StatusCodes.BAD_REQUEST).send({message: 'Email ou Senha Inválido!'});
    }

    let user;

    try {
      user = await User.findOne({where: {email}});
    } catch (error) {
      res
        .status(StatusCodes.UNAUTHORIZED).send({message: 'Email ou Senha Inválido!'});
    }

    if (!user.isValidPassword(password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED).send({message: 'A senha está incorreta!'});
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      {expiresIn: '1h'}
    );

    return res.status(StatusCodes.OK).send({
      auth: true,
      message: 'OK',
      username: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  }

  // logout
  async logout(req: Request, res: Response) {
    res
      .status(StatusCodes.OK)
      .send({auth: false, message: 'OK', token: null});
  }

  // logout
  async register(req: Request, res: Response) {
    const {name, email, password, code} = req.body;
    const verifyRegisterCode = code === process.env.USER_REGISTER_CODE;

    if (!(name || email || password || verifyRegisterCode)) {
      res.status(StatusCodes.BAD_REQUEST).send({message: 'BAD_REQUEST'});
    }

    let user;
    try {
      user = await User.findOne({where: {email}});
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).send({message: 'UNAUTHORIZED'});
    }

    if (user) {
      res.status(StatusCodes.BAD_REQUEST).send({message: 'BAD_REQUEST'});
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
        res.status(StatusCodes.UNAUTHORIZED).send({message: 'UNAUTHORIZED'});
      }

      res.status(StatusCodes.OK).send({message: 'OK', email: email});
    }
  }
}

export default new AuthController();
