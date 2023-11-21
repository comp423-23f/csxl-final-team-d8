/**
 * The Room Card widget abstracts the implementation of each
 * individual room card from the whole room page.
 *
 *
 */

import { Component, Input } from '@angular/core';
import { Room } from '../room.model';
import { Profile } from '/workspace/frontend/src/app/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from '../room.service';

@Component({
  selector: 'room-card',
  templateUrl: './room-card.widget.html',
  styleUrls: ['./room-card.widget.css']
})
export class RoomCard {
  /** The room to show */
  @Input() room!: Room;
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
    private roomService: RoomService
  ) {}

  /** Delete the given room object using the Room Service's deleteRoom method
   * @param room: Room representing the updated room
   * @returns void
   */
  deleteRoom(room: Room): void {
    let confirmDelete = this.snackBar.open(
      'Are you sure you want to delete this room?',
      'Delete'
    );
    confirmDelete.onAction().subscribe(() => {
      this.roomService.deleteRoom(room).subscribe(() => {
        this.snackBar.open('Room Deleted', '', { duration: 2000 });
        location.reload();
      });
    });
  }
}
