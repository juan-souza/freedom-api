import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {StatusCodes} from "http-status-codes";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = req.headers['x-access-token'] as string;

  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).send({auth: false, message: 'Nenhum token fornecido.'});

  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(StatusCodes.UNAUTHORIZED).send({auth: false, message: 'Falha ao autenticar o token.'});
  }

  // Call the next middleware or controller
  next();
};
