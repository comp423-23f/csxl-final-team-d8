import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { Room } from './room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(
    protected http: HttpClient,
    protected auth: AuthenticationService
  ) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/rooms');
  }

  getRoom(title: String): Observable<Room> {
    return this.http.get<Room>('/api/rooms/' + title);
  }

  createSeat(room: Room): Observable<Room> {
    return this.http.post<Room>('/api/rooms', room);
  }

  updateSeat(room: Room): Observable<Room> {
    return this.http.put<Room>('/api/rooms', room);
  }
}
