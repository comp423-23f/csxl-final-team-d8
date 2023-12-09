"""Seat API

Seat route used to create Seats."""

from fastapi import APIRouter, Depends, HTTPException
from pytest import console_main

from backend.models.coworking.seat import Seat
from backend.models.coworking.seat_details import SeatDetails
from backend.services.coworking.seat import SeatService
from ..api.authentication import registered_user
from ..models.user import User
from ..services.exceptions import RoomNotFoundException

api = APIRouter(prefix="/api/seats")
openapi_tags = {
    "name": "Seats",
    "description": "Create and retrieve CSXL Seats.",
}


@api.get("", response_model=list[SeatDetails], tags=["Seats"])
def get_seats(
    seat_service: SeatService = Depends(),
) -> list[SeatDetails]:
    """
    Get all seats

    Parameters:
        seat_service: a valid SeatService

    Returns:
        list[SeatDetails]: All Seats in the Seat database table
    """
    return seat_service.seats()


@api.get("/{id}", response_model=list[Seat], tags=["Seats"])
def get_room_seats(
    id: str,
    seat_service: SeatService = Depends(),
) -> list[Seat]:
    """
    Get all seats in a room

    Parameters:
        id: a string unique identifier for Room
        seat_service: a valid SeatService

    Returns:
        list[Seat]: All Seats in a given room
    """
    # Try to get seats with matching id
    try:
        # Return room seats
        return seat_service.room_seats(id)
    except RoomNotFoundException as e:
        # Raise 404 exception if search fails (no response)
        raise HTTPException(status_code=404, detail=str(e))


@api.post("", response_model=Seat, tags=["Seats"])
def new_seat(
    seat: Seat,
    seat_service: SeatService = Depends(),
) -> Seat:
    """
    Create seat

    Parameters:
        seat: a valid seat model
        subject: a valid User model representing the currently logged in User
        seat_service: a valid SeatService

    Returns:
        Seat: Created seat

    Raises:
        HTTPException 422 if create() raises an Exception
    """
    try:
        return seat_service.create(seat)  # type: ignore
    except Exception as e:
        # Raise 422 exception if creation fails (request body is shaped incorrectly / not authorized)
        raise HTTPException(status_code=422, detail=str(e))


@api.delete("/{id}", response_model=None, tags=["Seats"])
def delete_seat(
    id: int,
    seat_service: SeatService = Depends(),
):
    """
    Delete seat based on id

    Parameters:
        id: an integer representing a unique identifier for a Seat
        seat_service: a valid SeatService

    Raises:
        HTTPException 404 if delete() raises an Exception
    """

    try:
        # Try to delete seat
        seat_service.delete(id)
    except RoomNotFoundException as e:
        # Raise 404 exception if delete fails (seat does not exist / not authorized)
        raise HTTPException(status_code=404, detail=str(e))
