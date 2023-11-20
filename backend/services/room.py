"""
The Room Service allows the API to manipulate rooms data in the database.
"""

from fastapi import Depends
from sqlalchemy import Null, select
from sqlalchemy.orm import Session
from backend.entities.coworking.room_entity import RoomEntity

from backend.models.coworking.room import Room
from backend.models.coworking.room_details import RoomDetails

from ..database import db_session
from ..models import User


class RoomService:
    """Service that performs all of the actions on the `Room` table"""

    def __init__(
        self,
        session: Session = Depends(db_session),
    ):
        """Initializes the `RoomService` session"""
        self._session = session

        
    def all(self) -> list[Room]:
        """
        Retrieves all rooms from the table

        Returns:
            list[Room]: List of all `Room`
        """
        # Select all entries in `Room` table
        query = select(RoomEntity)
        entities = self._session.scalars(query).all()

        # Convert entries to a model and return
        return [entity.to_model() for entity in entities]


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
        if room.id:
            # Set id to None so database can handle setting the id
            room.id = None  # type: ignore

        else:
            # Otherwise, create new object
            room_entity = RoomEntity.from_model(room)  # type: ignore

            # Add new object to table and commit changes
            self._session.add(room_entity)
            self._session.commit()

            # Return added object
            return room_entity.to_model()


# TODO Services method for deleting a room, inserting a room
