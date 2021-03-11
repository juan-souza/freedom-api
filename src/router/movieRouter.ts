import {Router, Request, Response, NextFunction} from 'express';
import {connection} from "../db/db";
import {Movie} from "../entity/Movie";

export class MovieRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  // CREATE
  public async post(req: Request, res: Response, next: NextFunction) {
    const movie = new Movie();
    movie.title = req.body.title;
    movie.plot_summary = req.body.plot_summary;
    movie.duration = req.body.duration;
    await movie.save();
    res.send(movie);
  }

  // READ
  public get(req: Request, res: Response, next: NextFunction) {
    connection
      .then(async con => {
        const superHeroes: Movie[] = await con.manager.find(Movie);
        res.json(superHeroes);
      })
      .catch(error => {
        console.error("Error ", error);
        res.json(error);
      });
  }

  // READ SINGLE
  public async getId(req: Request, res: Response, next: NextFunction) {
    const movie = await Movie.findOne({
      where: {
        id: req.params.id
      }
    });
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({message: "Movie not found"})
    }
  }

  // UPDATE
  public async put(req: Request, res: Response, next: NextFunction) {
    const movie = await Movie.findOne({
      where: {
        id: req.params.id
      }
    });
    if (movie) {
      if (req.body.title) {
        movie.title = req.body.title;
      }
      if (req.body.plot_summary) {
        movie.plot_summary = req.body.plot_summary;
      }
      if (req.body.duration) {
        movie.duration = req.body.duration;
      }
      await movie.save();
      res.send(movie);
    } else {
      res.status(404).send({message: "Movie not found"})
    }
  }

  // DELETE
  public async delete(req: Request, res: Response, next: NextFunction) {
    const movie = await Movie.findOne({
      where: {
        id: req.params.id
      }
    });
    if (movie) {
      await movie.remove();
      res.send({message: 'Movie deleted'});
    } else {
      res.status(404).send({message: "Movie not found"})
    }
  }

  init() {
   // this.router.post('/', this.post);
    this.router.get('/', this.get);
    this.router.get('/:id', this.getId);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }

}

const movieRouter = new MovieRouter();
movieRouter.init();

export default movieRouter.router;
