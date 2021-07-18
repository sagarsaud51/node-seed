import { NextFunction, Request, Response } from 'express';
import UserService from './../service/user.service';

class UserMiddleware {

  async validateRequiredUserBodyFeilds(req: Request, res: Response, next: NextFunction) {
    if (req.body.username && req.body.password && req.body.email) {
      next();
    } else {
      res.status(400).send({ error: 'Missing required fields' });
    }
  }

  async validateIfUserExists(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.readById(req.body.id);
    if (user) {
      next();
    } else {
      res.status(400).send({ error: `User with ${req.body.id} not found` });
    }
  }

  async extractUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }

}


export default new UserMiddleware();