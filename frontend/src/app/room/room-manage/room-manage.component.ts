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

//not sure if need below
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/permission.service';
import { permissionGuard } from 'src/app/permission.guard';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent {
  /** Route information to be used in Room Routing Module */
  public static Route = {
    path: 'rooms/room-manage',
    //path: ':id/edit',
    title: 'Create New/Edit Room',
    component: RoomManageComponent,
    canActivate: [],
    resolve: { profile: profileResolver, rooms: roomResolver }
  };

  /** Store the room.  */
  public the_room: Room;

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** Store the room id. */
  room_id: string = 'new';

  /** Add validators to the form */
  id = new FormControl('', [Validators.required]);
  nickname = new FormControl('', [Validators.required]);
  building = new FormControl('', [Validators.required]);
  room = new FormControl('', [Validators.required]);
  capacity = new FormControl(0, [Validators.required]);
  reservable = new FormControl(false, [Validators.required]);

  /** Create a Room Editor Form */
  public roomForm = this.formBuilder.group({
    id: this.id,
    nickname: this.nickname,
    building: this.building,
    room: this.room,
    capacity: this.capacity,
    reservable: this.reservable
  });

  /** Constructs the room editor component */
  constructor(
    //private or protected?
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected roomService: RoomService,
    protected snackBar: MatSnackBar,
    private router: Router
  ) {
    /** Initialize data from resolvers. */
    const data = this.route.snapshot.data as {
      profile: Profile;
      the_room: Room;
    };
    this.profile = data.profile;
    this.the_room = data.the_room;

    if (data.the_room) {
      this.the_room = data.the_room;
    } else {
      this.the_room = {
        id: '',
        nickname: '',
        building: '',
        room: '',
        capacity: 0,
        reservable: false
        // seats: null
      };
    }

    /** Set room form data */
    this.roomForm.setValue({
      id: this.the_room.id,
      nickname: this.the_room.nickname,
      building: this.the_room.building,
      room: this.the_room.room,
      capacity: this.the_room.capacity,
      reservable: this.the_room.reservable
    });

    /** Get id from the url */
    // let room_id = this.route.snapshot.params['id'];
    // this.room_id = room_id;
  }

  /** Event handler to handle submitting the New Room Form.
   * @returns {void}
   */
  onSubmit(): void {
    if (this.roomForm.valid) {
      Object.assign(this.the_room, this.roomForm.value);
      this.roomService.createRoom(this.the_room).subscribe({
        next: (the_room) => this.onSuccess(the_room),
        error: (err) => this.onError(err)
      });
    }
  }

  /** Opens a confirmation snackbar when a room is successfully updated.
   * @returns {void}
   */
  private onSuccess(room: Room): void {
    this.router.navigate(['/rooms']);
    this.snackBar.open('Room Created', '', { duration: 2000 });
  }

  /** Opens a snackbar when there is an error updating a room.
   * @returns {void}
   */
  private onError(err: any): void {
    console.error('Error: Room Not Created');
    this.snackBar.open('Error: Room Not Created', '', {
      duration: 2000
    });
  }
}
