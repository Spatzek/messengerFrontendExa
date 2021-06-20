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

  getUser(): Observable<any>{
    return  this.socket
      .fromEvent<User>('getUser');
  }

  async createUser(username: string, password: string): Promise<any>{
    await this.socket.emit('createUser', {username, password});
  }
}
