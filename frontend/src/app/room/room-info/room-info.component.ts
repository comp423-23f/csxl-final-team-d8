import { Component, Input } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { roomDetailResolver } from '../room.resolver';
import { Room } from '../room.model';
import { RoomService } from '../room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomDetails } from 'src/app/models.module';
import { Profile } from 'src/app/profile/profile.service';

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

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** The organization to show */
  public room: Room;

  /** Constructs the Organization Detail component */
  constructor(private route: ActivatedRoute) {
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
