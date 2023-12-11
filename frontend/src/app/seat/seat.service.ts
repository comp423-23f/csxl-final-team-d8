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
}
