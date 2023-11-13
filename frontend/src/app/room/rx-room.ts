import { RxObject } from '../rx-object';
import { Room } from './room.model';

export class RxOrganization extends RxObject<Room[]> {
  pushRoom(room: Room): void {
    this.value.push(room);
    this.notify();
  }

  updateRoom(room: Room): void {
    this.value = this.value.map((o) => {
      return o.id !== room.id ? o : room;
    });
    this.notify();
  }

  removeRoom(roomToRemove: Room): void {
    this.value = this.value.filter((room) => roomToRemove.id !== room.id);
    this.notify();
  }
}
