import {User} from './entities/user';

/*
This file functions like an interface. We store a list of all methods we can call using the this.store.dispatch.
These methods are implemented in the state.
 */

export class GetUser{
  static readonly  type = '[Auth]GetUser';
  constructor(public username: string, public password: string) {
  }
}

export class Logout{
  static readonly  type = '[Auth]Logout';
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
