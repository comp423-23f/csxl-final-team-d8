"""Tests for Coworking Rooms Service."""

from unittest.mock import create_autospec
import pytest
from backend.services.coworking.room import RoomNotFoundException
from backend.services.exceptions import UserPermissionException
from ....services.coworking import RoomService
from ....models.coworking import RoomDetails

# Imported fixtures provide dependencies injected for the tests as parameters.
from .fixtures import room_svc, permission_svc

# Import the setup_teardown fixture explicitly to load entities in database
from .room_data import fake_data_fixture

# Explicitly import Data Fixture to load entities in database
from ..core_data import setup_insert_data_fixture

# Import the fake model data in a namespace for test assertions
from . import room_data
from backend.test.services.coworking.room_data import add_to, add_to_updated
from ..user_data import root, ambassador, user

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


# Test `RoomService.rooms()`


def test_list_rooms_enforces_permission(room_svc: RoomService):
    """Test that the service enforces permissions when attempting to list a room."""

    # Setup to test permission enforcement on the PermissionService.
    room_svc._permission = create_autospec(room_svc._permission)

    # Test permissions with root user (admin permission)
    room_svc.rooms(root)
    room_svc._permission.enforce.assert_called_with(root, "room.rooms", "rooms")


def test_list_rooms_root(room_svc: RoomService):
    rooms = room_svc.rooms(root)
    assert len(rooms) == len(room_data.rooms)
    assert isinstance(rooms[0], RoomDetails)


def test_list_rooms_ambassador(room_svc: RoomService):
    rooms = room_svc.rooms(ambassador)
    assert len(rooms) == len(room_data.rooms)
    assert isinstance(rooms[0], RoomDetails)


def test_list_rooms_user(room_svc: RoomService):
    with pytest.raises(UserPermissionException):
        room_svc.rooms(user)
        pytest.fail()  # Fail test if no error was thrown above


def test_list_ordered_by_capacity(room_svc: RoomService):
    rooms = room_svc.rooms(root)
    for i in range(1, len(rooms)):
        assert rooms[i - 1].capacity <= rooms[i].capacity


# Test `RoomService.create()`


def test_create_enforces_permission(room_svc: RoomService):
    """Test that the service enforces permissions when attempting to create a room."""

    # Setup to test permission enforcement on the PermissionService.
    room_svc._permission = create_autospec(room_svc._permission)

    # Test permissions with root user (admin permission)
    room_svc.create(root, add_to)
    room_svc._permission.enforce.assert_called_with(
        root, "room.create", "rooms/new/edit"
    )


def test_create_room_root(room_svc: RoomService):
    created_room = room_svc.create(root, add_to)
    assert created_room is not None


def test_create_room_ambassador(room_svc: RoomService):
    with pytest.raises(UserPermissionException):
        room_svc.create(ambassador, add_to)


def test_create_room_user(room_svc: RoomService):
    with pytest.raises(UserPermissionException):
        room_svc.create(user, add_to)


# Test `RoomService.update()`


def test_update_room_root(room_svc: RoomService):
    room_svc.create(root, add_to)
    room_svc.update(root, add_to_updated)
    assert room_svc.get_from_id("SN150").nickname == "UPD8TED"


def test_update_room_ambassador(room_svc: RoomService):
    room_svc.create(root, add_to)
    room_svc.update(ambassador, add_to_updated)
    assert room_svc.get_from_id("SN150").nickname == "UPD8TED"


def test_update_room_user(room_svc: RoomService):
    with pytest.raises(UserPermissionException):
        room_svc.update(user, add_to)


# Test `RoomService.delete()`


def test_delete_enforces_permission(room_svc: RoomService):
    # Setup to test permission enforcement on the PermissionService.
    room_svc._permission = create_autospec(room_svc._permission)

    # Test permissions with root user (admin permission)
    room_svc.create(root, add_to)
    room_svc.delete(root, "SN150")
    room_svc._permission.enforce.assert_called_with(root, "room.delete", "rooms")


def test_delete_room_root(room_svc: RoomService):
    room_svc.create(root, add_to)
    room_svc.delete(root, "SN150")
    with pytest.raises(RoomNotFoundException):
        room_svc.get_from_id("SN150")


def test_delete_room_ambassador(room_svc: RoomService):
    room_svc.create(root, add_to)
    with pytest.raises(UserPermissionException):
        room_svc.delete(ambassador, "SN150")


def test_delete_room_user(room_svc: RoomService):
    room_svc.create(root, add_to)
    with pytest.raises(UserPermissionException):
        room_svc.delete(user, "SN150")
