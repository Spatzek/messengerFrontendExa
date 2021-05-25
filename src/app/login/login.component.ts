import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = new FormControl('');
  constructor() {}

  ngOnInit(): void {  }
  username(): void {
    console.log(this.message.value);
  }
  password(): void {
    console.log(this.message.value);
  }

  login(): void {
    console.log(this.message.value);
  }
}
