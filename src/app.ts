import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import AuthRouter from './router/authRouter';
import UserRouter from './router/userRouter';
import dotenv from 'dotenv';
import {connect} from './database/connection';
import {checkJwt} from './middleware/checkJwt';
import {checkRole} from './middleware/checkRole';
import Roles from './entity/Roles';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.routes();
    connect().then(r => console.log('connect to db'));
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    this.express.use('/api/v1/auth', AuthRouter);
    this.express.use('/api/v1/users', [checkJwt], UserRouter);
    this.express.use('/api/v1/users2', [checkJwt, checkRole([Roles.GUEST])], UserRouter);
  }
}

export default new App().express;
