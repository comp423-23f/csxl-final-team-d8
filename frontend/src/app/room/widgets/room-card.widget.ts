/**
 * The Room Card widget abstracts the implementation of each
 * individual room card from the whole room page.
 *
 *
 */

import { Component, Input } from '@angular/core';
import { Room } from '../room.model';
import { Profile } from '/workspace/frontend/src/app/profile/profile.service';

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
  constructor() {}
}
