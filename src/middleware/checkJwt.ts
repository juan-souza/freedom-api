import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  /*  const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    if (typeof token === "string") {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({auth: false, message: 'Failed to authenticate token.'});

        req.userId = decoded.id;
        next();
      });
    }*/


  // Get the jwt token from the head
/*
  const token = <string>req.headers["auth"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);
*/


  // Call the next middleware or controller
  next();
};
