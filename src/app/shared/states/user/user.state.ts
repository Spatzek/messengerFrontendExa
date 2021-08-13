import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {User} from './entities/user';
import {CreateUser, GetUser, SetUser} from './user.action';
import {UserService} from './user.service';

// StateModel is used to initialise the variables.
export class UserStateModel {
  user: User | undefined ;
}
// @State is used to initialise the state name and set up the initial values.
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService,
              private store: Store) {
    // We intercept a response back from the backend. And we then call the set user method!
    // We dont know when we will get a response from the backend.
    // So we use this method to continuously observe the socket for a response.
    this.userService.getUser().subscribe((data) => {
      this.store.dispatch(new SetUser(data));
    });
  }

  // Select the user from the state itself. If undefined = the user is not logged in. If there is data - then the user is logged in.!!!
  @Selector()
  static loggedUser(state: UserStateModel): any{
    return state.user;
  }

  // This is the set user method. We get the state and set the user up based on the data we get from the backend.!!
  @Action(SetUser)
  setUser({ getState, setState }: StateContext<UserStateModel>,
          { user }: SetUser): any {

        const state = getState();

        setState({
          ...state,
          user,
        });
  }
 // This is where Create user method is executed. We will send a socket request to the backend and pass username and password as an object.
  @Action(CreateUser)
  createUser({ getState, setState }: StateContext<UserStateModel>,
          { username, password }: CreateUser): any {
    return this.userService
      .createUser(username , password);
  }

  @Action(GetUser)
  getUser({ getState, setState }: StateContext<UserStateModel>,
          { username, password }: GetUser): any {
    return this.userService
      .sendGetUser(username , password);
  }
}
