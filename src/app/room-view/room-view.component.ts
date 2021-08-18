import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GroupState} from '../shared/states/group/group.state';
import {Observable, Subscription} from 'rxjs';
import {Group} from '../shared/states/group/entities/group';
import {GetGroup} from '../shared/states/group/group.action';
import {first} from 'rxjs/operators';
import {Room} from '../shared/states/room/entities/room';
import {ActivatedRoute, Router} from '@angular/router';
import {ClearRooms, GetRoom} from '../shared/states/room/room.action';
import {RoomState} from '../shared/states/room/room.state';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // @ts-ignore
  @Select(RoomState.selectedRooms) Rooms: Observable<Room[]>;
  // @ts-ignore
  @Select(GroupState.selectedGroup) selectedGroup: Observable<Group>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    // @ts-ignore
    this.selectedGroup.subscribe(
      (data) => {
        if (!data){
          this.router.navigate(['groups']);
        }
      });
    // @ts-ignore
    this.subscription = this.selectedGroup.subscribe((data) => {
      for (let i = 0; i < data.list_of_rooms.length; i++) {
        console.log(i);
        this.store.dispatch(new GetRoom(data.list_of_rooms[i])).pipe(first())
          .subscribe(
            data => {
              // this.router.navigate(['chats']);
            },
            error => {

            });
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
    this.store.dispatch(new ClearRooms()).pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['chats']);
        },
        error => {

        });
  }

}
