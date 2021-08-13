// StateModel is used to initialise the variables.
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Room} from './entities/room';
import {CreateRoom, GetRoom, SetRoom} from './room.action';
import {RoomService} from './room.service';

export class RoomStateModel {
  room: Room | undefined ;
}
// @State is used to initialise the state name and set up the initial values.
@State<RoomStateModel>({
  name: 'room',
  defaults: {
    room: undefined,
  },
})
@Injectable()
export class RoomState {
  constructor(private roomService: RoomService,
              private store: Store) {
    // We intercept a response back from the backend. And we then call the set user method!
    // We dont know when we will get a response from the backend.
    // So we use this method to continuously observe the socket for a response.
    this.roomService.getRoom().subscribe((data) => {
      this.store.dispatch(new SetRoom(data));
    });
  }

  // Select the user from the state itself. If undefined = the user is not logged in. If there is data - then the user is logged in.!!!
  @Selector()
  static selectedRoom(state: RoomStateModel): any{
    return state.room;
  }

  // This is the set user method. We get the state and set the user up based on the data we get from the backend.!!
  @Action(SetRoom)
  setRoom({ getState, setState }: StateContext<RoomStateModel>,
          { room }: SetRoom): any {

    const state = getState();

    setState({
      ...state,
      room,
    });
  }
  // This is where Create user method is executed. We will send a socket request to the backend and pass username and password as an object.
  @Action(CreateRoom)
  createRoom({ getState, setState }: StateContext<RoomStateModel>,
             { name }: CreateRoom): any {
    return this.roomService.createRoom(name);
  }

  @Action(GetRoom)
  getRoom({ getState, setState }: StateContext<RoomStateModel>,
          { id }: GetRoom): any {
    return this.roomService.sendGetRoom(id);
  }
}
