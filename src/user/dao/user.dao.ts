import { ICreateUserDto } from '../dto/create.user.dto';
import pino from 'pino';
import { IPutUserDto } from '../dto/put.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';
import shortid from 'shortid';


const log = pino();

class UserDao {
  users: Array<ICreateUserDto> = [];

  constructor() {
    log.info('New instance of UserDao');
  }

  async addUser(user: ICreateUserDto){
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  async putUserById(userId: string, user: IPutUserDto) {
    const index = this.users.findIndex((user: { id: string }) => user.id === userId);
    this.users.splice(index, 1, user);
    return this.getUserById(userId);
  }

  async removeUserById(userId: string) {
    const index = this.users.findIndex((user: { id: string }) => user.id === userId);
    this.users.splice(index, 1);
    return `${userId} removed`;
  }

  async getUserByUsername(userName: string) {
    const index = this.users.findIndex((user: { username: string }) => user.username === userName);
    const user = this.users[index];
    return !!user;
  }

}

export default new UserDao();