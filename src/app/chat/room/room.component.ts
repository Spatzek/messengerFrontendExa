import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {


  message = new FormControl('');
  constructor(private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}
