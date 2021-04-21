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
    res.json(users);
  }

  async findById(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
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
}

export default new UserController();
