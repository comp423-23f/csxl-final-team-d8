//The Room Manage Component allows ambassadors and admins to edit rooms and allows admins to create a new room.

import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Room } from '../room.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { roomDetailResolver } from '../room.resolver';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/permission.service';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent {
  /** Route information to be used in Room Routing Module */
  public static Route = {
    path: ':id/edit',
    title: 'Create New/Edit Room',
    component: RoomManageComponent,
    canActivate: [],
    resolve: { profile: profileResolver, rooms: roomDetailResolver }
  };

  public profile$: Observable<Profile | undefined>;
  public adminPermission$: Observable<boolean>;

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
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected roomService: RoomService,
    private permission: PermissionService,
    private profileService: ProfileService,
    protected snackBar: MatSnackBar,
    private router: Router
  ) {
    this.profile$ = this.profileService.profile$;
    this.adminPermission$ = this.permission.check('admin.view', 'admin/');
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
      };
    }
    console.log(data.the_room);

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
    let room_id = this.route.snapshot.params['id'];
    this.room_id = room_id;
  }

  /** Event handler to handle submitting the New Room Form.
   * @returns {void}
   */
  onSubmit(): void {
    if (this.roomForm.valid) {
      Object.assign(this.the_room, this.roomForm.value);
      console.log(this.room_id);
      if (this.room_id == 'new') {
        this.roomService.createRoom(this.the_room).subscribe({
          next: (the_room) => this.onSuccess(the_room),
          error: (err) => this.onError(err)
        });
      } else {
        this.roomService.updateRoom(this.the_room).subscribe({
          next: (room) => this.onSuccess(room),
          error: (err) => this.onError(err)
        });
      }
    }
  }

  /** Opens a confirmation snackbar when a room is successfully updated.
   * @returns {void}
   */
  private onSuccess(room: Room): void {
    this.router.navigate(['/rooms']);
    this.snackBar.open('Room Created/Updated', '', { duration: 2000 });
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
