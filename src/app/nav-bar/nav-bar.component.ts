import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserState} from '../shared/states/user/user.state';
import {Observable, Subject} from 'rxjs';
import {User} from '../shared/states/user/entities/user';
import {Logout} from '../shared/states/user/user.action';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  // @ts-ignore
  @Select(UserState.loggedUser) currentUser: Observable<User>;
  // @ts-ignore
  currentU: User;

  ngOnInit(): any {}

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  constructor(private router: Router,
              private store: Store,
              private actions$: Actions,
              ) {
    this.actions$.pipe(ofActionSuccessful(Logout),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.router.navigate(['']);
    });

    // @ts-ignore
    this.currentUser.subscribe(
      (data) => {
        this.currentU = data;
      });
  }

  signOut(): any {
    this.store.dispatch(new Logout());
    this.router.navigate(['']);
  }

}
