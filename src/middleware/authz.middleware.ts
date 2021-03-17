import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401)
  }

  const token = authorization.replace('Barrer', '').trim();


  try {

    const data = jwt.verify(token, process.env.ACCESS_TOKEN)
    console.log(data)

  } catch {
    return res.sendStatus(401)
  }


}