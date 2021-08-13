import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {User} from '../user/entities/user';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private socket: Socket) { }

  async sendGetRoom(id: number): Promise<any>{
    await this.socket.emit('getRoom', {id});
  }

  // We get a response back from the backend. Its an observable because we dont know when the response might come back due to latancy issues.
  getRoom(): Observable<any>{
    return  this.socket
      .fromEvent<User>('getRoom');
  }

  // We send a request to the backend. We state tat the event is called 'createUser' and we send in the username and password.
  async createRoom(name: string): Promise<any>{
    await this.socket.emit('createRoom', {name});
  }
}
