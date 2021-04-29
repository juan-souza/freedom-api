import {Request, Response} from 'express';
import {User} from '../entity/User';
import {StatusCodes} from "http-status-codes";
import {UserSettings} from "../entity/UserSettings";

class UserController {
  async insert(req: Request, res: Response) {

    const {name, email, password, role, statusInfo} = req.body;

    if (!(name || email || password)) {
      return res.status(StatusCodes.BAD_REQUEST).send({message: 'BAD_REQUEST'});
    }

    const user = await User.findOne({where: {email}});

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).send({message: 'Email address is registered!'});
    }

    const userNew = new User();

    userNew.name = name;
    userNew.password = password;
    userNew.email = email;
    userNew.role = role;
    userNew.createDate = Date.now();
    userNew.statusInfo = statusInfo;

    // create user settings
    const userSettings = new UserSettings();
    userNew.settings = userSettings;

    await userSettings.save();
    await userNew.save();
    res.status(StatusCodes.OK).send({message: 'OK'});

  }

  async findAll(req: Request, res: Response) {
    const users = await User.find();
    users.map(user => {
      delete user.password
    })
    res.json(users);
  }

  async findById(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      delete user.password;
      res.send(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async update(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const {name, email, password, role, statusInfo} = req.body;

    const userEmail = await User.findOne({where: {email}});

    if (userEmail.id !== user.id) {
      return res.status(StatusCodes.NOT_FOUND).send({message: 'Email address is registered!'});
    }

    if (user) {

      if (name) {
        user.name = name;
      }

      if (password) {
        user.password = password;
      }

      if (email) {
        user.email = email;
      }

      if (role) {
        user.role = role
      }

      if (statusInfo) {
        user.statusInfo = statusInfo;
      }

      await user.save();
      res.send(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async delete(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      await user.remove();
      res.send({message: 'User deleted'});
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async getCurrentUser(res: Response) {
    const {email} = res.locals.jwtPayload;
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}

export default new UserController();
