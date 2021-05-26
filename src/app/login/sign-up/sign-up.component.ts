import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SignUpService} from './Shared/SignUp.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  message = new FormControl('');
  messages: string[] = [];

  constructor(private signUpService: SignUpService) {
  }

  ngOnInit(): void {
    this.signUpService.listenForMessages()
      .subscribe(message => {
        this.messages.push(message);
      });
  }
}
