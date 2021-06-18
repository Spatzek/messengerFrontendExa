import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {pipe, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
  message = new FormControl('');
  messages: string[] = [];
  unsubscriber$ = new Subject();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscriber$)
      )
      .subscribe(message =>{
        console.log('');
        this.messages.push(message);
      });
    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(messages =>{
        console.log('');
        this.messages = messages;
      });
    this.chatService.connect();
    this.chatService.setUserGet(3);
  }
  ngOnDestroy(): void{
    console.log('');
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    this.chatService.disconnect();
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
    }
}
