import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GroupState} from '../shared/states/group/group.state';
import {Observable} from 'rxjs';
import {Group} from '../shared/states/group/entities/group';
import {GetUser} from '../shared/states/user/user.action';
import {first} from 'rxjs/operators';
import {GetGroup, SelectGroup} from '../shared/states/group/group.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  // @ts-ignore
  @Select(GroupState.selectedGroups) Groups: Observable<Group[]>;
  constructor(
    private router: Router,
    private store: Store
  ) {

    this.store.dispatch(new GetGroup()).pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['chats']);
        },
        error => {

        });
  }

  ngOnInit(): void {
  }

  selectGroup(group: Group): any {
    this.store.dispatch(new SelectGroup(group)).pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['chats']);
        },
        error => {

        });
    this.router.navigate(['/rooms/' + group.group_id]);
  }
}
