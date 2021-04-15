import {Router} from 'express';
import PortfolioTrackerController from "../controllers/PortfolioTrackerController";

class PortfolioTrackerRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/', PortfolioTrackerController.insert);
    this.router.get('/', PortfolioTrackerController.findAll);
    this.router.get('/:id', PortfolioTrackerController.findById);
    this.router.put('/:id', PortfolioTrackerController.update);
    this.router.delete('/:id', PortfolioTrackerController.delete);
  }
}

const portfolioTrackerRouter = new PortfolioTrackerRouter();
export default portfolioTrackerRouter.router;
