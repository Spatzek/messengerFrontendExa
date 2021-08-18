// StateModel is used to initialise the variables.
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ChatService} from './chat.service';
import {append, patch} from '@ngxs/store/operators';
import {GetAllMessages, SendMessage, SetMessages} from './chat.action';
import {Message} from './entities/message';

export class ChatStateModel {
  allMessages: Message[] | undefined ;
}
// @State is used to initialise the state name and set up the initial values.
@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    allMessages: [],
  },
})
@Injectable()
export class ChatState {
  constructor(private chatService: ChatService,
              private store: Store) {
    // We intercept a response back from the backend. And we then call the set user method!
    // We dont know when we will get a response from the backend.
    // So we use this method to continuously observe the socket for a response.
    this.chatService.listenForMessages().subscribe((data) => {
      this.store.dispatch(new SetMessages( data ));
    });
  }

  // Select the user from the state itself. If undefined = the user is not logged in. If there is data - then the user is logged in.!!!
  @Selector()
  static getMessages(state: ChatStateModel): any{
    return state.allMessages;
  }

  // This is the set user method. We get the state and set the user up based on the data we get from the backend.!!
  @Action(SetMessages)
  setMessages({ getState, setState }: StateContext<ChatStateModel>,
              { message }: SetMessages): any {

    const state = getState();
    setState(
      patch({
        allMessages: append([message])
      })
    );
  }


  @Action(SendMessage)
  sendMessage({ getState, setState }: StateContext<ChatStateModel>,
              { message }: SendMessage): any {
    return this.chatService.sendMessage(message);
  }

  @Action(GetAllMessages)
  getAllMessages({ getState, setState }: StateContext<ChatStateModel>): any {
    return this.chatService.getAllMessages();
  }

}
