import { ICrudInterface } from '../../common/crud.interface';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPutUserDto } from '../dto/put.user.dto';
import UserDao from '../dao/user.dao';
import pino from 'pino';


const log = pino();

class UserService implements ICrudInterface {

  constructor() {
    log.info('User Service Has been Initialized');
  }

  async create(user: ICreateUserDto) {
    return UserDao.addUser(user);
  }

  async deleteById(id: string) {
    return UserDao.removeUserById(id);
  }

  async list(limit: number, page: number): Promise<any> {
    return UserDao.getUsers();
  }

  async putById(id: string, resource: IPutUserDto): Promise<any> {
    return UserDao.putUserById(id, resource);
  }

  async readById(id: string): Promise<any> {
    return UserDao.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<any> {
    return UserDao.getUserByUsername(username);
  }

}

export default new UserService();