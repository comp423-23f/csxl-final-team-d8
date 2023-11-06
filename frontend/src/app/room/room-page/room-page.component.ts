import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';

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
    resolve: { profile: profileResolver }
  };
}
