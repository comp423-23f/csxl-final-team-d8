import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../room.model';

@Pipe({
  name: 'roomFilter'
})
export class RoomFilterPipe implements PipeTransform {
  /** Returns a mapped array of rooms that start with the input string (if search query provided).
   * @param {Observable<Room[]>} rooms: observable list of valid Room models
   * @param {String} searchQuery: input string to filter by
   * @returns {Observable<Room[]>}
   */
  transform(rooms: Room[], searchQuery: String): Room[] {
    // Sort the rooms list alphabetically by name
    //will this work with numbers??
    rooms = rooms.sort((a: Room, b: Room) => {
      return a.id.toLowerCase().localeCompare(b.id.toLowerCase());
    });

    // If a search query is provided, return the rooms that start with the search query.
    if (searchQuery) {
      return rooms.filter(
        (room) =>
          room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.building.toLowerCase().includes(searchQuery.toLowerCase())
        //can figure out how to filter by capacity later
      );
    } else {
      // Otherwise, return the original list.
      return rooms;
    }
  }
}
