"""Seat API

Seat route used to create Seats."""

from fastapi import APIRouter, Depends, HTTPException
from pytest import console_main

from backend.models.coworking.seat import Seat
from backend.services.coworking.seat import SeatService
from ..api.authentication import registered_user
from ..models.user import User
from ..services.exceptions import RoomNotFoundException

api = APIRouter(prefix="/api/seats")
openapi_tags = {
    "name": "Seats",
    "description": "Create and retrieve CSXL Seats.",
}


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
