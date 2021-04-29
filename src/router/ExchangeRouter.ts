import {Router} from 'express';
import ExchangeController from "../controllers/ExchangeController";

class ExchangeRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/balance/all', ExchangeController.fetchBalanceAll);
    this.router.get('/balance/:id', ExchangeController.fetchBalance);
    this.router.get('/exchange/all', ExchangeController.getExchanges);
  }
}

const exchangeRouter = new ExchangeRouter();
export default exchangeRouter.router;
