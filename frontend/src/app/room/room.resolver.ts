//The Room Resolver allows the room to be injected into the routes of components.

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Room } from './room.model';
import { RoomService } from './room.service';

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
    console.log(inject(RoomService).getRoom(route.paramMap.get('id')!));
    return inject(RoomService).getRoom(route.paramMap.get('id')!);
  } else {
    return {
      id: '',
      nickname: '',
      building: '',
      room: '',
      capacity: 0,
      reservable: false,
      seats: null
    };
  }
};
