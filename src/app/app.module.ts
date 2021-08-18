import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {UserState} from './shared/states/user/user.state';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {RoomState} from './shared/states/room/room.state';
import {GroupState} from './shared/states/group/group.state';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { RoomViewComponent } from './room-view/room-view.component';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import { ChatViewComponent } from './chat-view/chat-view.component';
import {ChatState} from './shared/states/chat/chat.state';
import {ReactiveFormsModule} from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:3100', options: {}};
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GroupViewComponent,
    RoomViewComponent,
    ChatViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgxsModule.forRoot(
      [
        UserState,
        RoomState,
        GroupState,
        ChatState
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsStoragePluginModule.forRoot({
      key: ['user']
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
