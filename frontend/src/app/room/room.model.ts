//The Room Model defines the shape of Room data retrieved from the Room Service and the API.

export interface Room {
  id: string;
  nickname: string;
  building: string;
  room: string;
  capacity: number;
  reservable: boolean;
}
