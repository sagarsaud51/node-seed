import { Request, Response } from 'express';
import UserService from '../service/user.service';
import { argon2d, argon2i, hash } from 'argon2';
import pino from 'pino';

const log = pino();

class UserController {

  async getAllUsers(req: Request, res: Response) {
    const users = await UserService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await UserService.readById(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: Request, res: Response) {
    req.body.password = await hash(req.body.password);
    const userId = await UserService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async editUser(req: Request, res: Response) {
    req.body.password = await hash(req.body.password);
    log.info(await UserService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeUser(req: Request, res: Response) {
    log.info(await UserService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new UserController();