// StateModel is used to initialise the variables.
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Group} from './entities/group';
import {AddRoom, CreateGroup, GetGroup, RemoveRoom, SetGroup} from './group.action';
import {GroupService} from './group.service';

export class GroupStateModel {
  group: Group | undefined ;
}
// @State is used to initialise the state name and set up the initial values.
@State<GroupStateModel>({
  name: 'group',
  defaults: {
    group: undefined,
  },
})
@Injectable()
export class GroupState {
  constructor(private groupService: GroupService,
              private store: Store) {
    // We intercept a response back from the backend. And we then call the set user method!
    // We dont know when we will get a response from the backend.
    // So we use this method to continuously observe the socket for a response.
    this.groupService.getGroup().subscribe((data) => {
      this.store.dispatch(new SetGroup(data));
    });
  }

  // Select the user from the state itself. If undefined = the user is not logged in. If there is data - then the user is logged in.!!!
  @Selector()
  static selectedGroup(state: GroupStateModel): any{
    return state.group;
  }

  // This is the set user method. We get the state and set the user up based on the data we get from the backend.!!
  @Action(SetGroup)
  setGroup({ getState, setState }: StateContext<GroupStateModel>,
           { group }: SetGroup): any {

    const state = getState();

    setState({
      ...state,
      group,
    });
  }
  // This is where Create user method is executed. We will send a socket request to the backend and pass username and password as an object.
  @Action(CreateGroup)
  createGroup({ getState, setState }: StateContext<GroupStateModel>,
              { name }: CreateGroup): any {
    return this.groupService.createGroup(name);
  }

  @Action(GetGroup)
  getGroup({ getState, setState }: StateContext<GroupStateModel>,
           { id }: GetGroup): any {
    return this.groupService.sendGetGroup(id);
  }

  @Action(AddRoom)
  addRoom({ getState, setState }: StateContext<GroupStateModel>,
          { group_id, room_id }: AddRoom): any {
    return this.groupService.addRoom(group_id, room_id);
  }

  @Action(RemoveRoom)
  removeRoom({ getState, setState }: StateContext<GroupStateModel>,
             { group_id, room_id }: RemoveRoom): any {
    return this.groupService.removeRoom(group_id, room_id);
  }

}
