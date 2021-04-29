import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import Exchange, {Exchanges} from "../entity/enum/Exchange";
import * as ccxt from "ccxt";
import {AccessPoint} from "../entity/AccessPoint";

class ExchangeController {

  async fetchBalanceAll(req: Request, res: Response) {
    try {
      let balance;
      const accessPoints = await AccessPoint.find();
      const jwtPayload = res.locals.jwtPayload;

      for (let i = 0; i < accessPoints.length; i++) {
        const access = accessPoints[i];

        const exchangeName = Exchanges[access.exchange].exchangeId;
        let exchange = new ccxt[exchangeName]({
          apiKey: access.apiKey,
          secret: access.secretKey
        });

        //balance = await exchange.fetchBalance();
      }

      res.send(balance);
    } catch (e) {
      res.status(StatusCodes.NOT_FOUND).send({message: 'Error!'});
    }
  }

  async fetchBalance(req: Request, res: Response) {

  }

  async getExchanges(req: Request, res: Response) {
    res.send(Object.keys(Exchange).filter(key => isNaN(Number(key))));
  }

}

export default new ExchangeController();
