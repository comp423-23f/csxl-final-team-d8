import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { Seat } from './seat.model';
// ^^ should this be from a new model file in seat directory?

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  /*private seats: RxSeat = new RxSeat();
  public seats$: Observable<Seat[]> = this.seats.value$;*/

  //^^ above can be added/moved to new service in admin directory once figure out permissions
  constructor(
    protected http: HttpClient,
    protected auth: AuthenticationService
  ) {}

  //need to understand how to check user has permissions-organization.service.ts vs admin-organization.service.ts

  getSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>('/api/seats');
  }

  getSeat(title: String): Observable<Seat> {
    return this.http.get<Seat>('/api/seats/' + title);
  }

  createSeat(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>('/api/seats', seat);
  }

  updateSeat(seat: Seat): Observable<Seat> {
    return this.http.put<Seat>('/api/seats', seat);
  }

  /*deleteSeat(seatToRemove: Seat): Observable<Seat> {
    return this.http
      .delete<Seat>(`/api/seats/${seatToRemove.title}`)
      .pipe(
        tap((_) => {
          this.seats.removeSeat(seatToRemove);
        })
      );
  }*/

  //^^ above can be added/moved to new service in admin directory once figure out permissions
}
