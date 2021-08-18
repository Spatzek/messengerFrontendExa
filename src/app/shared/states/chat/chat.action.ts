import {Message} from './entities/message';

export class GetAllMessages{
  static readonly  type = '[Auth]GetAllMessages';

}

export class SendMessage{
  static readonly  type = '[Auth]SendMessage';
  constructor(public message: Message) {
  }
}

export class SetMessages{
  static readonly  type = '[Auth]SetMessages';
  constructor(public message: Message) {
  }
}
