"""Service that manages seats in the coworking space."""

from fastapi import Depends
from sqlalchemy.orm import Session
from backend.entities.coworking.room_entity import RoomEntity

from backend.services.exceptions import RoomNotFoundException, SeatNotFoundException
from ...database import db_session
from ...models.coworking import Seat, SeatDetails
from ...entities.coworking import SeatEntity

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class SeatService:
    """SeatService is the access layer to coworking seats."""

    def __init__(self, session: Session = Depends(db_session)):
        """Initializes a new RoomService.

        Args:
            session (Session): The database session to use, typically injected by FastAPI.
        """
        self._session = session

    def room_seats(self, id: str) -> list[Seat]:
        """
        List the seats within a room.

        Parameters:
            id: a string representing a unique room id

        Raises:
            RoomNotFoundException: If no room is found with the corresponding id
        """
        # Find given room
        obj = self._session.query(RoomEntity).filter(RoomEntity.id == id).one_or_none()

        # Ensure room exists
        if obj:
            return obj.to_details_model().seats
        else:
            # Raise exception
            raise RoomNotFoundException(id)
