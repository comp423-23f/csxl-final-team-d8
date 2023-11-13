/**
 * The Room Card widget abstracts the implementation of each
 * individual room card from the whole room page.
 *
 *
 */

import { Component, Input } from '@angular/core';
import { Room } from '../room.model';

@Component({
  selector: 'room-card',
  templateUrl: './room-card.widget.html',
  styleUrls: ['./room-card.widget.css']
})
export class RoomCard {
  /** The room to show */
  @Input() room!: Room;

  constructor() {}
}
