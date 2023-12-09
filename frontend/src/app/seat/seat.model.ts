import { Room } from '../room/room.model';

/** Interface for the Seat Type */
export interface Seat {
  id: number;
  title: string;
  shorthand: string;
  reservable: boolean;
  has_monitor: boolean;
  sit_stand: boolean;
  x: number;
  y: number;
  room: Room;
}

/** Interface for the SeatDetails Type
export interface SeatDetails {
  room: Room;
} */
