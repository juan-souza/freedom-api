import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from "http-status-codes";

export const checkRole = (roles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.jwtPayload)
      return res.status(StatusCodes.UNAUTHORIZED).send({auth: false, message: 'Unauthorized.'});

    // Get the user ID from previous midleware
    const role = res.locals.jwtPayload.role;

    // FIXME: avaliar necessidade.
    // Get user role from the database
    /*  let user: User;
      try {
        user = await User.findOne({
          where: {
            id: res.locals.jwtPayload.id
          }
        });

      } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send();
      }*/

    // Check if array of authorized roles includes the user's role
    if (roles.indexOf(role) > -1) next();
    else res.status(StatusCodes.UNAUTHORIZED).send({auth: false, message: 'Unauthorized.'});
  };
};
