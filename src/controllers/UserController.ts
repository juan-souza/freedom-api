import {Request, Response} from 'express';
import {User} from '../entity/User';
import {StatusCodes} from "http-status-codes";
import {UserSettings} from "../entity/UserSettings";

class UserController {
  async insert(req: Request, res: Response) {
    const user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    //create user settings
    const userSettings = new UserSettings();
    user.settings = userSettings;

    await userSettings.save();
    await user.save();
    res.send(user);
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
