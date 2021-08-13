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

const config: SocketIoConfig = { url: 'http://localhost:3100', options: {}};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgxsModule.forRoot(
      [
        UserState,
        RoomState,
        GroupState
      ],
      {
        developmentMode: !environment.production,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
