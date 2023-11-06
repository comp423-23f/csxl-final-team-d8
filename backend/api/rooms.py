"""Room API

Room route used to create Rooms."""

from fastapi import APIRouter, Depends, HTTPException

from backend.models.coworking.room import Room
from backend.services.room import RoomService
from ..api.authentication import registered_user
from ..models.user import User

api = APIRouter(prefix="/api/rooms")
openapi_tags = {
    "name": "Rooms",
    "description": "Create CSXL Rooms.",
}


@api.post("", response_model=Room, tags=["Rooms"])
def new_room(
    room: Room,
    subject: User = Depends(registered_user),
    room_service: RoomService = Depends(),
) -> Room:
    """
    Create room

    Parameters:
        room: a valid Room model
        subject: a valid User model representing the currently logged in User
        room_service: a valid RoomService

    Returns:
        Room: Created room

    Raises:
        HTTPException 422 if create() raises an Exception
    """

    try:
        # Try to create and return new room
        return room_service.create(subject, room)
    except Exception as e:
        # Raise 422 exception if creation fails (request body is shaped incorrectly / not authorized)
        raise HTTPException(status_code=422, detail=str(e))
