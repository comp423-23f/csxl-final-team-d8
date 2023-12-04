/**
 * The Seat Resolver allows the seat to be injected into the routes
 * of components.
 */

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Seat } from './seat.model';
import { SeatService } from './seat.service';

/** This resolver injects the list of seats into the seat component. */
export const seatResolver: ResolveFn<Seat[] | undefined> = (route, state) => {
  return inject(SeatService).getSeats(route.paramMap.get('id')!);
};
