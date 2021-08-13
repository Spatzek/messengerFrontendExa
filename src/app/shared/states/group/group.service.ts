import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {User} from '../user/entities/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private socket: Socket) { }

  async sendGetGroup(id: number): Promise<any>{
    await this.socket.emit('getGroup', {id});
  }

  // We get a response back from the backend. Its an observable because we dont know when the response might come back due to latancy issues.
  getGroup(): Observable<any>{
    return  this.socket
      .fromEvent<User>('getGroup');
  }

  // We send a request to the backend. We state tat the event is called 'createUser' and we send in the username and password.
  async createGroup(name: string): Promise<any>{
    await this.socket.emit('createGroup', {name});
  }

  async addRoom(group_id: number, room_id: number): Promise<any>{
    await this.socket.emit('addRoom', {group_id , room_id});
  }

  async removeRoom(group_id: number, room_id: number): Promise<any>{
    await this.socket.emit('removeRoom', {group_id , room_id});
  }
}
