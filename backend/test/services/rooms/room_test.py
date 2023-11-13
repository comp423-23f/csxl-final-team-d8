"""Tests for the Room mock layer."""

# PyTest
import pytest
from unittest.mock import create_autospec

# Tested Dependencies
from backend.services.room import RoomService
from backend.models.coworking import Room

# Injected Service Fixtures
from ..fixtures import room_svc

# Explicitly import Data Fixture to load entities in database
from ..core_data import setup_insert_data_fixture

# Data Models for fake Data Inserted in Setup
from .room_test_data import rooms, to_add

# Test Functions

# Test 'RoomService.all()'


def test_get_all(room_svc: RoomService):
    """Test that all rooms can be retrieved."""
    fetched_rooms = room_svc.all()  # type: ignore
    assert fetched_rooms is not None
    assert len(fetched_rooms) == len(rooms)
    assert isinstance(fetched_rooms[0], Room)  # type: ignore


# Test 'RoomService.create()'
def test_create_room(room_svc: RoomService):
    """Test that a new room can be created in rooms."""
    created_room = room_svc.create(to_add)
    assert created_room is not None
