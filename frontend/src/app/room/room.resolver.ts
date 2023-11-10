/**
 * The Room Resolver allows the room to be injected into the routes
 * of components.
 */

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Room } from './room.model.ts';
import { RoomService } from './room.service.ts';

/** This resolver injects the list of rooms into the room component. */
export const roomResolver: ResolveFn<Room[] | undefined> = (route, state) => {
  return inject(RoomService).getRooms();
};

/** This resolver injects a room into the room detail component. */
export const roomDetailResolver: ResolveFn<Room | undefined> = (
  route,
  state
) => {
  if (route.paramMap.get('id')! != 'new') {
    return inject(RoomService).getRoom(route.paramMap.get('id')!);
  } else {
    return {
      id: '',
      nickname: '',
      building: '',
      room: '',
      capacity: null,
      reservable: false,
      seats: null
      //includes fields from both room model and room details model, which are separated right now
    };
  }
};
