/**
 * The Seat Card widget abstracts the implementation of each
 * individual seat card from the whole seats page.
 *
 *
 */

import { Component, Input } from '@angular/core';
import { Seat } from '../seat.model';
import { Profile } from '/workspace/frontend/src/app/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeatService } from '../seat.service';

@Component({
  selector: 'seat-card',
  templateUrl: './seat-card.widget.html',
  styleUrls: ['./seat-card.widget.css']
})
export class SeatCard {
  /** The seat to show */
  @Input() seat!: Seat;
  /** The profile of the currently signed in user */
  @Input() profile?: Profile;

  /**
   * Determines whether or not the tooltip on the card is disabled
   * @param element: The HTML element
   * @returns {boolean}
   */
  isTooltipDisabled(element: HTMLElement): boolean {
    return element.scrollHeight <= element.clientHeight;
  }
  constructor(
    protected snackBar: MatSnackBar,
    private seatService: SeatService
  ) {}

  /** Delete the given seat object using the Seat Service's deleteSeat method
   * @param seat: Seat representing the updated seat
   * @returns void
   */
  /* deleteSeat(seat: Seat): void {
    let confirmDelete = this.snackBar.open(
      'Are you sure you want to delete this seat?',
      'Delete'
    );
    confirmDelete.onAction().subscribe(() => {
      this.seatService.deleteSeat(seat).subscribe(() => {
        this.snackBar.open('Seat Deleted', '', { duration: 2000 });
        location.reload();
      });
    }); 
  } */
}
