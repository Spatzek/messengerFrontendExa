import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserState} from '../shared/states/user/user.state';
import {Observable, Subject} from 'rxjs';
import {User} from '../shared/states/user/entities/user';
import {GetUser, SetUser} from '../shared/states/user/user.action';
import {first, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  // @ts-ignore
  loginForm: FormGroup;
  // @ts-ignore
  @Select(UserState.loggedUser) currentUser: Observable<User>;
  // @ts-ignore
  user: User ;


  message = new FormControl('');
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private store: Store,
              private actions$: Actions) {

    // @ts-ignore
    this.currentUser.subscribe((data) => {
      console.log(data);
      this.user = data;
    });

    this.actions$.pipe(ofActionSuccessful(SetUser),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
        if (this.user) {
          this.router.navigate(['/groups']);
        }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
    });
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get f(): any{
    return this.loginForm.controls;
  }

  login(): void {

    if (this.loginForm.invalid){
      return;
    }

    this.store.dispatch(new GetUser(this.loginForm.value.username, this.loginForm.value.password)).pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['chats']);
        },
        error => {

        });

  }
}
