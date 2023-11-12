import { Component } from '@angular/core';
import { Room } from 'src/app/models.module';
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
    resolve: { profile: profileResolver } // Add back later: , rooms: roomResolver }
  };
}
