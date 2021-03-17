import { Request, Response } from 'express';
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


class AuthController {

    constructor() { }

    async authentication(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })
        const isValidPassword = await bcrypt.compare(password, user.password)


        if (!isValidPassword) {
            return res.sendStatus(401);
        }


        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '12h' })

        return res.json({
            user,
            token
        })
    }

}

export default new AuthController();