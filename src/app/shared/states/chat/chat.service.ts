import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Message} from './entities/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }


  async sendMessage(msg: Message): Promise<any>{
    await this.socket.emit('message', msg);
  }

   listenForMessages(): Observable<Message> {
    return this.socket
      .fromEvent<Message>('newMessage');
  }

  async getAllMessages(): Promise<any> {
    return this.socket
      .fromEvent<Message>('allMessages');
  }
}
