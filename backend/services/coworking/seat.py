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

    def list(self) -> list[SeatDetails]:
        """Returns all seats in the coworking space.

        Returns:
            list[SeatDetails]: All seats in the coworking space orderd by increasing capacity.
        """
        entities = self._session.query(SeatEntity).all()
        return [entity.to_model() for entity in entities]

    def create(self, seat: Seat) -> Seat:
        """
        Creates a seat based on the input object and adds it to the table.
        If the seat's ID is unique to the table, a new entry is added.
        If the seat's ID already exists in the table, it raises an error.

        Parameters:
            subject: a valid User model representing the currently logged in User
            seat (Seat): seat to add to table

        Returns:
            Seat: Object added to table
        """

        # Checks if the seat already exists in the table
        seat_entity = SeatEntity.from_model(seat)  # type: ignore

        # Add new object to table and commit changes
        self._session.add(seat_entity)
        self._session.commit()

        # Return added object
        return seat_entity.to_model()

    def delete(self, title: str) -> None:
        """
        Delete the seat based on the provided title.
        If no item exists to delete, a debug description is displayed.

        Parameters:
            title: a string representing a unique seat title

        Raises:
            SeatNotFoundException: If no seat is found with the corresponding title
        """

        # Find object to delete
        obj = (
            self._session.query(SeatEntity)
            .filter(SeatEntity.title == title)
            .one_or_none()
        )

        # Ensure object exists
        if obj:
            # Delete object and commit
            self._session.delete(obj)
            # Save changes
            self._session.commit()
        else:
            # Raise exception
            raise SeatNotFoundException(title)
