import { Component, OnInit } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Room } from '../room.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { roomResolver } from '../room.resolver';
import { Profile } from 'src/app/profile/profile.service';

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
    resolve: { profile: profileResolver, rooms: roomResolver }
  };

  /** Store the room.  */
  public room: Room;

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** Store the room id. */
  //room_id: string = 'new';

  public roomForm = this.formBuilder.group({
    id: '',
    nickname: '',
    building: '',
    room: '',
    capacity: null,
    reservable: null,
    seats: null
  });

  constructor(
    //private or protected?
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected roomService: RoomService,
    protected snackBar: MatSnackBar,
    private router: Router
  ) {
    // const form = this.roomForm;
    // form.get('id')?.addValidators(Validators.required);
    // form.get('nickname')?.addValidators(Validators.required);

    const data = route.snapshot.data as { profile: Profile; room: Room };
    this.profile = data.profile;
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
}
