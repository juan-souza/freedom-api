import {Request, Response} from 'express';
import {AccessPoint} from '../entity/AccessPoint';
import {StatusCodes} from "http-status-codes";
import Exchange from "../entity/enum/Exchange";

//FIXME: criar seguranca apiKey/secretKey
class AccessPointController {
  async insert(req: Request, res: Response) {
    const accessPoint = new AccessPoint();
    accessPoint.name = req.body.accessPoint.name;
    accessPoint.createDate = Date.now();
    accessPoint.apiKey = req.body.accessPoint.apiKey;
    accessPoint.secretKey = req.body.accessPoint.secretKey;
    accessPoint.exchange = req.body.accessPoint.exchange;
    await accessPoint.save();
    res.send(accessPoint);
  }

  async findAll(req: Request, res: Response) {
    const accessPoints = await AccessPoint.find();
    res.json(accessPoints);
  }

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

  async getExchanges(req: Request, res: Response) {
    res.send(Object.keys(Exchange).filter(key => isNaN(Number(key))));
  }

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
