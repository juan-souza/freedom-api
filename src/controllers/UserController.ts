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

  // changePassword
  async changePassword(req: Request, res: Response) {
    // Get ID from JWT
    /*  const id = res.locals.jwtPayload.userId;

      //Get parameters from the body
      const {oldPassword, newPassword} = req.body;
      if (!(oldPassword && newPassword)) {
        res.status(400).send();
      }

      //Get user from the database
      const userRepository = getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      }

      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }

      //Validate de model (password lenght)
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Hash the new password and save
      user.hashPassword();
      userRepository.save(user);

      res.status(204).send();*/
  }


}


export default new UserController();



