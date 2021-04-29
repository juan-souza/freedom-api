import {Request, Response} from 'express';
import {AccessPoint} from '../entity/AccessPoint';
import {StatusCodes} from "http-status-codes";
import {User} from "../entity/User";
import UserController from "./UserController";

// FIXME: criar seguranca apiKey/secretKey
class AccessPointController {
  async insert(req: Request, res: Response) {
    const user = await UserController.getCurrentUser(res);

    const accessPoint = new AccessPoint();

    const { name, apiKey, secretKey, exchange } = req.body;

    accessPoint.name = name;
    accessPoint.createDate = Date.now();
    accessPoint.apiKey = apiKey;
    accessPoint.secretKey = secretKey;
    accessPoint.exchange = exchange;

    await accessPoint.save();

    user.accessPoints = [accessPoint];
    await User.save(user);

    res.send(accessPoint);
  }

  async findAll(req: Request, res: Response) {
    const user = await UserController.getCurrentUser(res);

    const accessPoints = await User.find({
      //where: {id: user.id},
      relations: ['accessPoints'],
    });

    res.json(accessPoints);
  }

  //FIXME: aplicar somente user
  async findById(req: Request, res: Response) {
    const accessPoint = await AccessPoint.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (accessPoint) {
      res.send(accessPoint);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  //FIXME: aplicar somente user
  async update(req: Request, res: Response) {
    const accessPoint = await AccessPoint.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (accessPoint) {
      if (req.body.name) {
        accessPoint.name = req.body.name;
      }
      if (req.body.apiKey) {
        accessPoint.apiKey = req.body.apiKey;
      }
      if (req.body.secretKey) {
        accessPoint.secretKey = req.body.secretKey;
      }
      if (req.body.exchange) {
        accessPoint.exchange = req.body.exchange;
      }
      await accessPoint.save();
      res.send(accessPoint);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  //FIXME: aplicar somente user
  async delete(req: Request, res: Response) {
    const accessPoint = await AccessPoint.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (accessPoint) {
      await accessPoint.remove();
      res.send({message: 'AccessPoint deleted'});
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

}

export default new AccessPointController();
