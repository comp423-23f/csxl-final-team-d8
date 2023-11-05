/** Interface for Permission Type */
export interface Permission {
  id?: number;
  action: string;
  resource: string;
}

/** Interface for Profile Type */
export interface Profile {
  id: number | null;
  pid: number;
  onyen: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  pronouns: string | null;
  registered: boolean;
  role: number;
  permissions: Permission[];
  github: string | null;
  github_id: number | null;
  github_avatar: string | null;
}

/** Interface for UserSummary Type (used on frontend for user requests) */
export interface UserSummary {
  id: number | null;
  pid: number;
  onyen: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  pronouns: string | null;
  permissions: Permission[];
}

/** Interface for the Role Type */
export interface Role {
  id: number;
  name: string;
}

/** Interface for the RoleDetails Type */
export interface RoleDetails {
  id: number;
  name: string;
  permissions: Permission[];
  users: Profile[];
}

/** Interface for the Seat Type */
export interface Seat {
  title: string;
  shorthand: string;
  reservable: boolean;
  has_monitor: boolean;
  sit_stand: boolean;
  x: number;
  y: number;
}

/** Interface for the SeatDetails Type */
export interface SeatDetails {
  room: Room;
}

/** Interface for the Room Type */
export interface Room {
  id: string;
  nickname: string | null;
}

/** Interface for the RoomDetails Type */
export interface RoomDetails {
  building: string;
  room: string;
  capacity: number;
  reservable: boolean;
  seats: Seat[];
}
