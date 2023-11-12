import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent {
  /** Route information to be used in Room Routing Module */
  public static Route = {
    path: 'rooms/room-manage',
    title: 'Manage Room',
    component: RoomManageComponent,

    canActivate: [],
    resolve: { profile: profileResolver } // Add back later: , rooms: roomResolver }
  };
}
