import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {User} from './entities/user';
import {CreateUser, GetUser, SetUser} from './user.action';
import {UserService} from './user.service';

export class UserStateModel {
  user: User | undefined ;
}

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
    this.userService.getUser().subscribe((data) => {
      this.store.dispatch(new SetUser(data));
    });
  }

  @Selector()
  static loggedUser(state: UserStateModel): any{
    return state.user;
  }

  @Action(GetUser)
  getUser({ getState, setState }: StateContext<UserStateModel>,
          { username, password }: GetUser): any {
    return this.userService
      .sendGetUser(username , password);
  }

  @Action(SetUser)
  setUser({ getState, setState }: StateContext<UserStateModel>,
          { user }: SetUser): any {
        const state = getState();
        setState({
          ...state,
          user,
        });
  }

  @Action(CreateUser)
  createUser({ getState, setState }: StateContext<UserStateModel>,
          { username, password }: CreateUser): any {
    return this.userService
      .createUser(username , password);
  }
}
