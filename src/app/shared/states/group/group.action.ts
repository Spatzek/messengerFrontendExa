import {Group} from './entities/group';

export class GetGroup{
  static readonly  type = '[Auth]GetGroup';
  constructor(public id: number) {
  }
}

export class CreateGroup{
  static readonly  type = '[Auth]CreateGroup';
  constructor(public name: string) {
  }
}

export class SetGroup{
  static readonly  type = '[Auth] SetGroup';
  constructor(public group: Group) {
  }
}
export class AddRoom{
  static readonly  type = '[Auth]AddRoom';
  constructor(public group_id: number, public room_id: number) {
  }
}
export class RemoveRoom{
  static readonly  type = '[Auth]RemoveRoom';
  constructor(public group_id: number , public room_id: number) {
  }
}
