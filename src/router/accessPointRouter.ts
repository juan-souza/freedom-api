import {Router} from 'express';
import AccessPointController from '../controllers/AccessPointController';

class AccessPointRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/', AccessPointController.insert);
    this.router.get('/', AccessPointController.findAll);
    this.router.get('/:id', AccessPointController.findById);
    this.router.put('/:id', AccessPointController.update);
    this.router.delete('/:id', AccessPointController.delete);
  }
}

const accessPointRouter = new AccessPointRouter();
export default accessPointRouter.router;
