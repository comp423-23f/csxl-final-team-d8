"""Room API

Room route used to create Rooms."""

from fastapi import APIRouter, Depends, HTTPException
from pytest import console_main

from backend.models.coworking.room import Room
from backend.models.coworking.room import Test
from backend.models.coworking.room_details import NewRoom
from backend.models.coworking.room_details import RoomDetails
from backend.services.room import RoomService
from ..api.authentication import registered_user
from ..models.user import User

api = APIRouter(prefix="/api/rooms")
openapi_tags = {
    "name": "Rooms",
    "description": "Create and retrieve CSXL Rooms.",
}


@api.get("", response_model=list[Room], tags=["Rooms"])
def get_rooms(
    room_service: RoomService = Depends(),
) -> list[Room]:
    """
    Get all rooms

    Parameters:
        room_service: a valid RoomService

    Returns:
        list[Room]: All Rooms in the Room database table
    """
    return room_service.all()


@api.post("", response_model=RoomDetails, tags=["Rooms"])
def new_room(
    # room: NewRoom,
    room: NewRoom,
    subject: User = Depends(registered_user),
    room_service: RoomService = Depends(),
) -> RoomDetails:
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
        print("in api")
        return room_service.create(subject, room)
        # return RoomDetails(
        #     id="nome",
        #     nickname="str",
        #     building="str",
        #     capacity=0,
        #     reservable=False,
        #     room="somethign",
        # )
        # return "something"
    except Exception as e:
        # Raise 422 exception if creation fails (request body is shaped incorrectly / not authorized)
        raise HTTPException(status_code=422, detail=str(e))
