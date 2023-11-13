import { Component, OnInit } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Room } from '../room.model';
//import { Profile } from 'src/app/models.module';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { roomResolver } from '../room.resolver';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent implements OnInit {
  /** Route information to be used in Room Routing Module */
  public static Route = {
    path: 'rooms/room-manage',
    title: 'Create New/Edit Room',
    component: RoomManageComponent,
    canActivate: [],
    resolve: { profile: profileResolver } // Add back later: , rooms: roomResolver }
  };

  public room: Room;

  public roomForm = this.formBuilder.group({
    id: '',
    nickname: '',
    building: '',
    room: '',
    capacity: '',
    reservable: '',
    seats: ''
  });

  constructor(
    route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected roomService: RoomService,
    protected snackBar: MatSnackBar
  ) {
    const form = this.roomForm;
    form.get('id')?.addValidators(Validators.required);
    form.get('nickname')?.addValidators(Validators.required);

    const data = route.snapshot.data as { room: Room };
    this.room = data.room;
  }

  ngOnInit(): void {
    let room = this.room;
    this.roomForm.setValue({
      id: room.id,
      nickname: room.nickname,
      building: null,
      room: null,
      capacity: null,
      reservable: null,
      seats: null
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      Object.assign(this.room, this.roomForm.value);
      this.roomService.createRoom(this.room).subscribe({
        next: (room) => this.onSuccess(room),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(room: Room) {
    this.snackBar.open('Room Saved', '', { duration: 2000 });
  }

  private onError(err: any) {
    console.error('How to handle this?');
  }

  // /** Store the room.  */
  // public room: Room;

  // /** Room Editor Form */
  // public roomForm = this.formBuilder.group({
  //   id: this.id,
  //   nickname: this.nickname,
  //   building: this.building,
  //   room: this.room,
  //   capacity: this.capacity,
  //   reservable: this.reservable,
  //   seats: this.seats
  // });
  // formBuilder: any;

  // /** Constructs the room editor component */
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   protected formBuilder: FormBuilder,
  //   protected snackBar: MatSnackBar,
  //   private roomService: RoomService,
  //   protected profileService: ProfileService
  // ) {
  //   const form = this.roomForm;
  // }

  // ngOnInit(): void {
  //   let room = this.room;

  //   this.roomForm.setValue({
  //     id: this.room.id,
  //     nickname: this.room.nickname,
  //     building: this.room.building,
  //     room: this.room.room,
  //     capacity: this.room.capacity,
  //     reservable: this.room.reservable,
  //     seats: this.room.seats
  //   });
  // }

  // onSubmit(): void {
  //   if (this.roomForm.valid) {
  //     Object.assign(this.room, this.roomForm.value);
  //     this.roomService.put(this.room).subscribe({
  //       next: (user) => this.onSuccess(user),
  //       error: (err) => this.onError(err)
  //     });
  //   }
  // }

  // private onSuccess(room: Room) {
  //   this.snackBar.open('Room Saved', '', { duration: 2000 });
  // }

  // private onError(err: any) {
  //   console.error('How to handle this?');
  // }
}
