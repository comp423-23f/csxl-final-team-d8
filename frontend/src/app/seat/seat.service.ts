import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { Seat } from './seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  constructor(
    protected http: HttpClient,
    protected auth: AuthenticationService
  ) {}

  /** Returns all seat entries from the backend database table using the backend HTTP get request.
   * @returns {Observable<Seat[]>}
   */
  getSeats(id: String): Observable<Seat[]> {
    return this.http.get<Seat[]>('/api/seats/' + id);
  }

  /** Returns the seat object from the backend database table using the backend HTTP get request.
   * @param title: String representing the seat's name
   * @returns {Observable<Seat[]>}
   */
  getSeat(title: String): Observable<Seat> {
    return this.http.get<Seat>('/api/seats/' + title);
  }

  /** Returns the new seat object from the backend database table using the backend HTTP post request.
   * @param seat: SeatSummary representing the new seat
   * @returns {Observable<Seat>}
   */
  createSeat(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>('/api/seats', seat);
  }

  /** Returns the updated seat object from the backend database table using the backend HTTP put request.
   * @param seat: SeatSummary representing the updated room
   * @returns {Observable<Seat>}
   */
  updateSeat(seat: Seat): Observable<Seat> {
    return this.http.put<Seat>('/api/seats', seat);
  }

  /** Deletes a seat
   * @param seat: seat object to delete
   * @returns {Observable<Seat>}
   */

  deleteSeat(seat: Seat): Observable<Seat> {
    return this.http.delete<Seat>('/api/rooms/' + seat.title);
  }
}
