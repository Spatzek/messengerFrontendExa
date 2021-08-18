import {Room} from './entities/room';

export class GetRoom{
  static readonly  type = '[Auth] GetRoom ';
  constructor(public id: number) {
  }
}

export class SetRoom{
  static readonly  type = '[Auth] SetRoom';
  constructor(public room: Room) {
  }
}

export class ClearRooms{
  static readonly  type = '[Auth] ClearRooms';
  constructor() {
  }
}

export class CreateRoom{
  static readonly  type = '[Auth]CreateRoom';
  constructor(public name: string) {
  }
}
