"""Room API

Room routes used to create, update, get, and delete Rooms."""

from fastapi import APIRouter, Depends, HTTPException
from pytest import console_main

from backend.models.coworking.room import Room
from backend.models.coworking.room_details import RoomDetails
from backend.models.coworking.room_details import NewRoom
from backend.models.coworking.seat import Seat
from backend.services.coworking.room import RoomDetails
from backend.services.coworking.room import RoomService
from backend.services.coworking.seat import SeatService
from ..api.authentication import registered_user
from ..models.user import User
from ..services.exceptions import RoomNotFoundException, UserPermissionException

api = APIRouter(prefix="/api/rooms")
openapi_tags = {
    "name": "Rooms",
    "description": "Create and retrieve CSXL Rooms.",
}


@api.get("", response_model=list[RoomDetails], tags=["Rooms"])
def get_rooms(
    room_service: RoomService = Depends(),
) -> list[RoomDetails]:
    """
    Get all rooms

    Parameters:
        room_service: a valid RoomService

    Returns:
        list[Room]: All Rooms in the Room database table
    """
    return room_service.rooms()


@api.post("", response_model=Room, tags=["Rooms"])
def new_room(
    room: RoomDetails,
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
        return room_service.create(room)  # type: ignore
    except Exception as e:
        # Raise 422 exception if creation fails (request body is shaped incorrectly / not authorized)
        raise HTTPException(status_code=422, detail=str(e))


@api.delete("/{id}", response_model=None, tags=["Rooms"])
def delete_room(
    id: str,
    room_service: RoomService = Depends(),
):
    """
    Delete room based on id

    Parameters:
        id: a string representing a unique identifier for a Room
        room_service: a valid RoomService

    Raises:
        HTTPException 404 if delete() raises an Exception
    """

    try:
        # Try to delete room
        room_service.delete(id)
    except RoomNotFoundException as e:
        # Raise 404 exception if delete fails (room does not exist / not authorized)
        raise HTTPException(status_code=404, detail=str(e))


@api.put(
    "",
    responses={404: {"model": None}},
    response_model=Room,
    tags=["Rooms"],
)
def update_room(
    room: RoomDetails,
    room_service: RoomService = Depends(),
) -> Room:
    """
    Update room

    Parameters:
        room: a valid Room model
        room_service: a valid RoomService

    Returns:
        Room: Updated room

    Raises:
        HTTPException 404 if update() raises an Exception
    """
    try:
        # Return updated room
        return room_service.update(room)
    except RoomNotFoundException as e:
        # Raise 404 exception if update fails (room does not exist / not authorized)
        raise HTTPException(status_code=404, detail=str(e))


@api.get(
    "/{id}",
    responses={404: {"model": None}},
    response_model=RoomDetails,
    tags=["Rooms"],
)
def get_room_from_id(id: str, room_service: RoomService = Depends()) -> RoomDetails:
    """
    Get room with matching id

    Parameters:
        id: a string representing a unique identifier for a Room
        room_service: a valid RoomService

    Returns:
        Room: Room with matching id

    Raises:
        HTTPException 404 if get_from_id() raises an Exception
    """

    # Try to get room with matching id
    try:
        # Return room
        return room_service.get_from_id(id)
    except RoomNotFoundException as e:
        # Raise 404 exception if search fails (no response)
        raise HTTPException(status_code=404, detail=str(e))
