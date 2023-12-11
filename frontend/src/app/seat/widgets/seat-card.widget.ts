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
  constructor(protected snackBar: MatSnackBar) {}
}
