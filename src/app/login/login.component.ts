import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  message = new FormControl('');
  constructor(private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])]
    });
  }
  get f(): any{
    return this.loginForm.controls;
  }

  login(): void {

    if (this.loginForm.invalid){
      return;
    }

    console.log(this.loginForm.value.username, this.loginForm.value.password);
    this.router.navigate(['chats']);
  }
}
