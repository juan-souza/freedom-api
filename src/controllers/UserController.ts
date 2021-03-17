import { Request, Response } from 'express';
import { User } from "../entity/User";

class UserController {

    async insert(req: Request, res: Response,) {
        const user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        await user.save();
        res.send(user);
    }


    async findAll(req: Request, res: Response,) {
        const user = await User.find();
        res.send(user);
    }


    async findById(req: Request, res: Response,) {
        console.log(req.params)
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "User not found" })
        }
    }


    async update(req: Request, res: Response,) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            await user.save();
            res.send(user);
        } else {
            res.status(404).send({ message: "User not found" })
        }
    }


    async delete(req: Request, res: Response) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            await user.remove();
            res.send({ message: 'User deleted' });
        } else {
            res.status(404).send({ message: "User not found" })
        }
    }

}


export default new UserController();



