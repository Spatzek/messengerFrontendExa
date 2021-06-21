import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {User} from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private socket: Socket) { }

  async sendGetUser(username: string, password: string): Promise<any>{
    await this.socket.emit('getUser', {username, password});
  }

  // We get a response back from the backend. Its an observable because we dont know when the response might come back due to latancy issues.
  getUser(): Observable<any>{
    return  this.socket
      .fromEvent<User>('getUser');
  }

  // We send a request to the backend. We state tat the event is called 'createUser' and we send in the username and password.
  async createUser(username: string, password: string): Promise<any>{
    await this.socket.emit('createUser', {username, password});
  }
}
