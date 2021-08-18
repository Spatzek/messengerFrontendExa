import { Component, OnInit } from '@angular/core';
import {SelectGroup} from '../shared/states/group/group.action';
import {first} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {GroupState} from '../shared/states/group/group.state';
import {Observable} from 'rxjs';
import {Group} from '../shared/states/group/entities/group';
import {ChatState} from '../shared/states/chat/chat.state';
import {SendMessage} from '../shared/states/chat/chat.action';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserState} from '../shared/states/user/user.state';
import {User} from '../shared/states/user/entities/user';
import {Router} from '@angular/router';
import {GetUser} from '../shared/states/user/user.action';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  // @ts-ignore
  chatForm: FormGroup;
  // @ts-ignore
  @Select(ChatState.getMessages) messages: Observable<Message[]>;
  // @ts-ignore
  @Select(UserState.loggedUser) user: Observable<User>;
  // @ts-ignore
  currentU: User;

  constructor(   private router: Router,
                 private store: Store,
                 private formBuilder: FormBuilder) {
    // @ts-ignore
    this.user.subscribe(
      (data) => {
        if (data){
          this.currentU = data;
        }else{
          this.router.navigate(['']);
        }
      });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  get f(): any{
    return this.chatForm.controls;
  }

  sendMessage(): any {
    if (this.chatForm.invalid){
      return;
    }

    this.store.dispatch(new SendMessage({username: this.currentU.username, message: this.chatForm.value.message})).pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['chats']);
        },
        error => {

        });
  }
}
