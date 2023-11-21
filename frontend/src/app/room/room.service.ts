import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable, tap } from 'rxjs';
import { Room } from './room.model';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { RxRoom } from './rx-room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  // private rooms: RxRoom = new RxRoom();
  // public rooms$: Observable<Room[]> = this.rooms.value$;

  constructor(
    //protected snackBar: MatSnackBar
    protected http: HttpClient,
    protected auth: AuthenticationService
  ) {}

  /** Returns all room entries from the backend database table using the backend HTTP get request.
   * @returns {Observable<Room[]>}
   */
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/rooms');
  }

  /** Returns the room object from the backend database table using the backend HTTP get request.
   * @param id: String representing the organization id
   * @returns {Observable<Room[]>}
   */
  getRoom(id: String): Observable<Room> {
    return this.http.get<Room>('/api/rooms/' + id);
  }

  /** Returns the new room object from the backend database table using the backend HTTP post request.
   * @param room: RoomSummary representing the new room
   * @returns {Observable<Room>}
   */
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>('/api/rooms', room);
  }

  /** Returns the updated room object from the backend database table using the backend HTTP put request.
   * @param room: RoomSummary representing the updated room
   * @returns {Observable<Room>}
   */
  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>('/api/rooms', room);
  }

  /** Deletes a room
   * @param room_id: id of the room object to delete
   * @returns {Observable<Room>}
   */
  // deleteRoom(roomToRemove: Room): Observable<Room> {
  //   return this.http.delete<Room>(`/api/rooms/${roomToRemove.id}`).pipe(
  //     tap((_) => {
  //       this.rooms.removeRoom(roomToRemove);
  //     })
  //   );
  // }

  deleteRoom(room: Room): Observable<Room> {
    return this.http.delete<Room>('/api/rooms/' + room.id);
  }
}
