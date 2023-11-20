"""Service that manages rooms in the coworking space."""

from fastapi import Depends
from sqlalchemy.orm import Session
from ...database import db_session
from ...models.coworking import RoomDetails
from ...entities.coworking import RoomEntity
from ...models.coworking import Room

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class RoomService:
    """RoomService is the access layer to coworking rooms. And a good pun."""

    def __init__(self, session: Session = Depends(db_session)):
        """Initializes a new RoomService.

        Args:
            session (Session): The database session to use, typically injected by FastAPI.
        """
        self._session = session

    def list(self) -> list[RoomDetails]:
        """Returns all rooms in the coworking space.

        Returns:
            list[RoomDetails]: All rooms in the coworking space ordered by increasing capacity.
        """
        entities = self._session.query(RoomEntity).order_by(RoomEntity.capacity).all()
        return [entity.to_details_model() for entity in entities]

    def create(self, room: Room) -> Room:  # type: ignore
        """
        Creates a room based on the input object and adds it to the table.
        If the room's ID is unique to the table, a new entry is added.
        If the room's ID already exists in the table, it raises an error.

        Parameters:
            subject: a valid User model representing the currently logged in User
            room (Room): room to add to table

        Returns:
            Room: Object added to table
        """

        # Checks if the room already exists in the table
        room_entity = RoomEntity.from_model(room)  # type: ignore

        # Add new object to table and commit changes
        self._session.add(room_entity)
        self._session.commit()

        # Return added object
        return room_entity.to_model()
