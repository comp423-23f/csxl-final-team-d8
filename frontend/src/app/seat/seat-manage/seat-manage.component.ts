import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { seatResolver } from '../seat.resolver';
import { Seat } from '../seat.model';
import { Profile } from 'src/app/models.module';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from '../seat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seat-manage',
  templateUrl: './seat-manage.component.html',
  styleUrls: ['./seat-manage.component.css']
})
export class SeatManageComponent {
  /** Route information to be used in Seat Routing Module */
  public static Route = {
    path: 'seats/seat-manage',
    title: 'Create New/Edit Seat',
    component: SeatManageComponent,
    canActivate: [],
    resolve: { profile: profileResolver, seats: seatResolver }
  };

  /** Store the seat.  */
  public the_seat: Seat;

  /** Store the currently-logged-in user's profile.  */
  public profile: Profile;

  /** Store the string title. */
  seat_title: string = 'new';

  /** Add validators to the form */
  title = new FormControl('', [Validators.required]);
  shorthand = new FormControl('', [Validators.required]);
  reservable = new FormControl(false, [Validators.required]);
  has_monitor = new FormControl(false, [Validators.required]);
  sit_stand = new FormControl(false, [Validators.required]);
  x = new FormControl(0, [Validators.required]);
  y = new FormControl(0, [Validators.required]);

  /** Create a Seat Editor Form */
  public seatForm = this.formBuilder.group({
    title: this.title,
    shorthand: this.shorthand,
    reservable: this.reservable,
    has_monitor: this.has_monitor,
    sit_stand: this.sit_stand,
    x: this.x,
    y: this.y
  });

  /** Constructs the seat editor component */
  constructor(
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected seatService: SeatService,
    protected snackBar: MatSnackBar,
    private router: Router
  ) {
    /** Initialize data from resolvers. */
    const data = this.route.snapshot.data as {
      profile: Profile;
      the_seat: Seat;
    };
    this.profile = data.profile;
    this.the_seat = data.the_seat;

    if (data.the_seat) {
      this.the_seat = data.the_seat;
    } else {
      this.the_seat = {
        title: '',
        shorthand: '',
        reservable: false,
        has_monitor: false,
        sit_stand: false,
        x: 0,
        y: 0
      };
    }

    /** Set seat form data */
    this.seatForm.setValue({
      title: this.the_seat.title,
      shorthand: this.the_seat.shorthand,
      reservable: this.the_seat.reservable,
      has_monitor: this.the_seat.has_monitor,
      sit_stand: this.the_seat.sit_stand,
      x: this.the_seat.x,
      y: this.the_seat.y
    });
  }

  /** Event handler to handle submitting the New Seat Form.
   * @returns {void}
   */
  onSubmit(): void {
    if (this.seatForm.valid) {
      Object.assign(this.the_seat, this.seatForm.value);
      this.seatService.createSeat(this.the_seat).subscribe({
        next: (the_seat) => this.onSuccess(the_seat),
        error: (err) => this.onError(err)
      });
    }
  }

  /** Opens a confirmation snackbar when a seat is successfully updated.
   * @returns {void}
   */
  private onSuccess(seat: Seat): void {
    this.router.navigate(['/seats']);
    this.snackBar.open('Seat Created', '', { duration: 2000 });
  }

  /** Opens a snackbar when there is an error updating a seat.
   * @returns {void}
   */
  private onError(err: any): void {
    console.error('Error: Seat Not Created');
    this.snackBar.open('Error: Seat Not Created', '', {
      duration: 2000
    });
  }
}
