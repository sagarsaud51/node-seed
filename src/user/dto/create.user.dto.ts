export interface ICreateUserDto {
  id: string;
  username: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}