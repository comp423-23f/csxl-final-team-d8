import { Component, Input } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { roomDetailResolver } from '../room.resolver';
import { Room } from '../room.model';
import { RoomService } from '../room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomDetails } from 'src/app/models.module';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { PermissionService } from 'src/app/permission.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent {
  public static Route = {
    //path: 'rooms/room-manage',
    path: ':id/info',
    title: 'Room Details',
    component: RoomInfoComponent,
    canActivate: [],
    resolve: { profile: profileResolver, room: roomDetailResolver }
  };

  public profile$: Observable<Profile | undefined>;
  public ambassadorPermission$: Observable<boolean>;

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  public room: Room;

  /** Constructs the Room Info component */
  constructor(
    private route: ActivatedRoute,
    private permission: PermissionService,
    private profileService: ProfileService
  ) {
    this.profile$ = this.profileService.profile$;
    this.ambassadorPermission$ = this.permission.check(
      'coworking.reservation.*',
      '*'
    );
    /** Initialize data from resolvers. */
    const data = this.route.snapshot.data as {
      profile: Profile;
      room: Room;
    };
    this.profile = data.profile;
    this.room = data.room;

    console.log(this.room);
  }
}
