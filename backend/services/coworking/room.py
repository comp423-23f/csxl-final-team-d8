"""Service that manages rooms in the coworking space."""

from fastapi import Depends
from sqlalchemy.orm import Session

from backend.services.exceptions import RoomNotFoundException
from ...database import db_session
from ...models.coworking import RoomDetails, Room, Seat
from ...models import User
from ...entities.coworking import RoomEntity
from ..permission import PermissionService

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class RoomService:
    """RoomService is the access layer to coworking rooms. And a good pun."""

    def __init__(
        self,
        session: Session = Depends(db_session),
        permission: PermissionService = Depends(),
    ):
        """Initializes a new RoomService and PermissionService.

        Args:
            session (Session): The database session to use, typically injected by FastAPI.
            permission (PermissionService): Permission service to allow for service method authorization.
        """
        self._session = session
        self._permission = permission

    def rooms(self, subject: User) -> list[RoomDetails]:
        """Returns all rooms in the coworking space.

        Parameters:
            subject: a valid User model representing the currently logged in User

        Returns:
            list[RoomDetails]: All rooms in the coworking space ordered by increasing capacity.
        """

        # Check if user has ambassador OR admin permission
        self._permission.enforce(subject, "room.rooms", f"rooms")

        entities = self._session.query(RoomEntity).order_by(RoomEntity.capacity).all()
        return [entity.to_details_model() for entity in entities]

    def create(self, subject: User, room: Room) -> Room:  # type: ignore
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

        # Check if user has admin permission
        self._permission.enforce(subject, "room.create", f"rooms/new/edit")

        # Checks if the room already exists in the table
        room_entity = RoomEntity.from_model(room)  # type: ignore

        # Add new object to table and commit changes
        self._session.add(room_entity)
        self._session.commit()

        # Return added object
        return room_entity.to_model()

    def delete(self, subject: User, id: str) -> None:
        """
        Delete the room based on the provided id.
        If no item exists to delete, a debug description is displayed.

        Parameters:
            subject: a valid User model representing the currently logged in User
            id: a string representing a unique room id

        Raises:
            RoomNotFoundException: If no room is found with the corresponding id
        """

        # Check if user has admin permission
        self._permission.enforce(subject, "room.delete", f"rooms")

        # Find object to delete
        obj = self._session.query(RoomEntity).filter(RoomEntity.id == id).one_or_none()

        # Ensure object exists
        if obj:
            # Delete object and commit
            self._session.delete(obj)
            # Save changes
            self._session.commit()
        else:
            # Raise exception
            raise RoomNotFoundException(id)

    def update(self, subject: User, room: RoomDetails) -> Room:
        """
        Update the room
        If none found with that id, a debug description is displayed.

        Parameters:
            subject: a valid User model representing the currently logged in User
            room (Room): Room to add to table

        Returns:
            Room: Updated room object

        Raises:
            RoomNotFoundException: If no room is found with the corresponding ID
        """

        # Check if user has ambassador OR admin permission
        self._permission.enforce(subject, "room.update", f"rooms/{room.id}/edit")

        # Query the room with matching id
        obj = self._session.get(RoomEntity, room.id)

        # Check if result is null
        if obj:
            # Update room object
            obj.id = room.id
            obj.nickname = room.nickname
            obj.building = room.building
            obj.room = room.room
            obj.capacity = room.capacity
            obj.reservable = room.reservable

            # Save changes
            self._session.commit()

            # Return updated object
            return obj.to_model()
        else:
            # Raise exception
            raise RoomNotFoundException(room.id)

    def get_from_id(self, id: str) -> RoomDetails:
        """
        Get the room from an id
        If none retrieved, a debug description is displayed.

        Parameters:
            id: a string representing a unique room id

        Returns:
            Room: Object with corresponding id

        Raises:

            RoomNotFoundException if no room is found with the corresponding id
        """

        # Query the room with matching id
        room = self._session.query(RoomEntity).filter(RoomEntity.id == id).one_or_none()

        # Check if result is null
        if room:
            # Convert entry to a model and return
            return room.to_details_model()
        else:
            # Raise exception
            raise RoomNotFoundException(id)
