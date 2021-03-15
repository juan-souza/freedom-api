import express from 'express';
import logger from 'morgan';
import * as bodyParser from 'body-parser';

import PersonRouter from './router/personRouter';
import MovieRouter from './router/movieRouter';
import UserRouter from './router/userRouter';
import {connect} from "./db/db";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    connect().then(r => console.log("connect to db"));
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/person', PersonRouter);
    this.express.use('/api/v1/movie', MovieRouter);
    this.express.use('/api/v1/user', UserRouter);
  }
}

export default new App().express;
