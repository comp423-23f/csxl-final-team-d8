//The Room Page Component serves as a way for ambassadors and admin to view all of the rooms in Sitterson/FB.

import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { roomResolver } from '../room.resolver';
import { Room } from '../room.model';
import { Profile } from '/workspace/frontend/src/app/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent {
  /** Route information to be used in app-routing module */
  public static Route = {
    path: '',
    title: 'Rooms',
    component: RoomPageComponent,

    canActivate: [],
    resolve: { profile: profileResolver, rooms: roomResolver }
  };

  /** Store Observable list of Rooms */
  public rooms: Room[];

  /** Store searchBarQuery */
  public searchBarQuery = '';

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** Stores the user permission value for current room. */
  public permValues: Map<number, number> = new Map();

  constructor(
    private route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {
    /** Initialize data from resolvers. */
    const data = this.route.snapshot.data as {
      profile: Profile;
      rooms: Room[];
    };
    this.profile = data.profile;
    this.rooms = data.rooms;
  }
}
