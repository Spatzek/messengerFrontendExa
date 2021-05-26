import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpService} from './Shared/SignUp.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  signupForm: FormGroup;

  messages: string[] = [];

  constructor(private signUpService: SignUpService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      password2: ['']
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup): any {
    const pass = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass === pass2 ? null : { notSame: true} ;
  }

  get f(): any{
    return this.signupForm.controls;
  }

  signUp(): void {
    if (this.signupForm.invalid){
      return;
    }

    console.log(this.signupForm.value.username, this.signupForm.value.password);
   //  this.router.navigate(['chats']);
  }
}
