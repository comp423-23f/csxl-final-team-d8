import { RxObject } from '../rx-object';
import { Seat } from './seat.model';

export class RxSeat extends RxObject<Seat[]> {
  pushRoom(seat: Seat): void {
    this.value.push(seat);
    this.notify();
  }

  updateRoom(seat: Seat): void {
    this.value = this.value.map((o) => {
      return o.title !== seat.title ? o : seat;
    });
    this.notify();
  }

  removeRoom(seatToRemove: Seat): void {
    this.value = this.value.filter((seat) => seatToRemove.title !== seat.title);
    this.notify();
  }
}
