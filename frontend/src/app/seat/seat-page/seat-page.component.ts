import { Component } from '@angular/core';
import { Seat } from '../seat.model';
import { ActivatedRoute } from '@angular/router';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Profile } from '/workspace/frontend/src/app/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { seatResolver } from '../seat.resolver';

@Component({
  selector: 'app-seat-page',
  templateUrl: './seat-page.component.html',
  styleUrls: ['./seat-page.component.css']
})
export class SeatPageComponent {
  /** Route information to be used in app-routing module */
  public static Route = {
    path: ':id',
    title: 'Seats',
    component: SeatPageComponent,
    canActivate: [],
    resolve: { profile: profileResolver, seats: seatResolver }
  };

  /** Store list of Seats */
  public seats: Seat[];

  /** Store room from ID */

  /** Store searchBarQuery */
  public searchBarQuery = '';

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** Stores the user permission value for current room. */
  public permValues: Map<number, number> = new Map();

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    /** Initialize data from resolvers. */
    const data = this.route.snapshot.data as {
      profile: Profile;
      seats: Seat[];
    };
    this.profile = data.profile;
    this.seats = data.seats;
  }
}
