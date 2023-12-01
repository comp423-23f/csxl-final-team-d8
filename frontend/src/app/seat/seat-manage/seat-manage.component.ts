import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { seatResolver } from '../seat.resolver';

@Component({
  selector: 'app-seat-manage',
  templateUrl: './seat-manage.component.html',
  styleUrls: ['./seat-manage.component.css']
})
export class SeatManageComponent {
  /** Route information to be used in Seat Routing Module */
  public static Route = {
    path: 'seats/seat-manage',
    //path: ':id/edit',
    title: 'Create New/Edit Seat',
    component: SeatManageComponent,
    canActivate: [],
    resolve: { profile: profileResolver, rooms: seatResolver }
  };
}
