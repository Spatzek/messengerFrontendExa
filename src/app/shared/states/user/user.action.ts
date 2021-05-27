import {User} from './entities/user';

export class GetUser{
  static readonly  type = '[Auth]GetUser';
  constructor(public username: string, public password: string) {
  }
}

export class SetUser{
  static readonly  type = '[Auth]SetUser';
  constructor(public user: User) {
  }
}

export class CreateUser{
  static readonly  type = '[Auth]CreateUser';
  constructor(public username: string, public password: string) {
  }
}
