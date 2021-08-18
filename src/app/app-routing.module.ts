import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomViewComponent} from './room-view/room-view.component';
import {GroupViewComponent} from './group-view/group-view.component';
import {ChatViewComponent} from './chat-view/chat-view.component';

const routes: Routes = [
  {
    path: 'chat/:id',
    component: ChatViewComponent
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signUp',
    loadChildren: () => import('./login/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'groups',
    component: GroupViewComponent
  },
  {
    path: 'rooms/:id',
    component: RoomViewComponent
  },
  /*{
    path: '**',
    redirectTo: ''
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
