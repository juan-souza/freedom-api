import {Request, Response} from 'express';
import {PortfolioTracker} from "../entity/PortfolioTracker";
import {StatusCodes} from "http-status-codes";
import Exchange from "../entity/enum/Exchange";

class PortfolioTrackerController {
  async insert(req: Request, res: Response) {
    const portfolioTracker = new PortfolioTracker();
    portfolioTracker.name = req.body.accessPoint.name;
    await portfolioTracker.save();
    res.send(portfolioTracker);
  }

  async findAll(req: Request, res: Response) {
    const portfolioTracker = await PortfolioTracker.find();
    res.json(portfolioTracker);
  }

  async findById(req: Request, res: Response) {
    const portfolioTracker = await PortfolioTracker.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (portfolioTracker) {
      res.send(portfolioTracker);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async update(req: Request, res: Response) {
    const portfolioTracker = await PortfolioTracker.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (portfolioTracker) {
      if (req.body.name) {
        portfolioTracker.name = req.body.name;
      }
      await portfolioTracker.save();
      res.send(portfolioTracker);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async delete(req: Request, res: Response) {
    const portfolioTracker = await PortfolioTracker.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (portfolioTracker) {
      await portfolioTracker.remove();
      res.send({message: 'PortfolioTracker deleted'});
    } else {
      res.status(StatusCodes.NOT_FOUND).send({message: ''});
    }
  }

  async getExchanges(req: Request, res: Response) {
    res.send(Object.keys(Exchange).filter(key => isNaN(Number(key))));
  }

}

export default new PortfolioTrackerController();
