import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  //Get the jwt token from the head
  const token = <string>req.headers["x-access-token"];

  if (!token) return res.status(401).json({auth: false, message: 'No token provided.'});

  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.ACCESS_TOKEN);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json({auth: false, message: 'Failed to authenticate token.'});
  }

  //Call the next middleware or controller
  next();
};
