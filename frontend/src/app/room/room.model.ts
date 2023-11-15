import { Seat } from '../seat/seat.model';

/** Interface for the Room Type */
// export interface Room {
//   id: string;
//   nickname: string | null;
// }

/** Interface for the RoomDetails Type */
// export interface RoomDetails {
//   building: string;
//   room: string;
//   capacity: number | null;
//   reservable: boolean;
//   seats: Seat[] | null;
// }

// export interface Room {
//   //not sure which of these still need | null
//   id: string;
//   nickname: string | null;
//   building: string;
//   room: string;
//   capacity: number | null;
//   reservable: boolean;
//   seats: Seat[] | null;
// }

export interface Room {
  //not sure which of these still need | null
  id: string;
  nickname: string;
  building: string;
  room: string;
  capacity: number;
  reservable: boolean;
  seats: Seat[] | null;
}
