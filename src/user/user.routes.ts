import { CommonRoutesConfig } from '../common/common.routes.config';
import { Application } from 'express';
import UserMiddleware from './middleware/user.middleware';
import UserController from './controller/user.controller';

export class UserRoutes extends CommonRoutesConfig {


  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/users')
      .get(UserController.getAllUsers)
      .post(
        UserMiddleware.validateRequiredUserBodyFeilds,
        UserController.createUser
      );


    this.app.param(`userId`,UserMiddleware.extractUserId)
    this.app
      .route('/users/:userId')
      .all(UserMiddleware.validateIfUserExists)
      .get(UserController.getUserById)
      .delete(UserController.removeUser)
      .put(UserController.editUser)

    return this.app;
  }

}