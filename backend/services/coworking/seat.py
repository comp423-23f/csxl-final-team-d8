"""Service that manages seats in the coworking space."""

from fastapi import Depends
from sqlalchemy.orm import Session
from backend.entities.coworking.room_entity import RoomEntity

from backend.services.exceptions import RoomNotFoundException, SeatNotFoundException
from ...database import db_session
from ...models.coworking import Seat
from ...models import User
from ...entities.coworking import SeatEntity
from ..permission import PermissionService

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class SeatService:
    """SeatService is the access layer to coworking seats."""

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

    def room_seats(self, subject: User, id: str) -> list[Seat]:
        """
        List the seats within a room.

        Parameters:
            id: a string representing a unique room id
            subject: a valid User model representing the currently logged in User

        Raises:
            RoomNotFoundException: If no room is found with the corresponding id
        """

        # Check if user has ambassador OR admin permission
        self._permission.enforce(subject, "seat.room_seats", f"seats/{id}")

        # Find given room
        obj = self._session.query(RoomEntity).filter(RoomEntity.id == id).one_or_none()

        # Ensure room exists
        if obj:
            return obj.to_details_model().seats
        else:
            # Raise exception
            raise RoomNotFoundException(id)
