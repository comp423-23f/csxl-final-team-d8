"""Contains mock data for to run tests on the organization feature"""

import pytest
from sqlalchemy.orm import Session
from backend.models.coworking.room import Room
from backend.entities.coworking.room_entity import RoomEntity

from ..reset_table_id_seq import reset_table_id_seq

room1 = Room(id="SN011", nickname="COMP 444 Office Hours")

room2 = Room(id="PH100", nickname="MATH 400 Classroom")

rooms = [room1, room2]

to_add = Room(id="GE500", nickname="CHEM 500 Classroom")

# Data Functions


def insert_fake_data(session: Session):
    """Inserts fake room data into the test session."""

    global rooms
    # create entities for test room data
    entities = []
    for room in rooms:
        entity = RoomEntity.from_model(room)  # type: ignore
        session.add(entity)
        entities.append(entity)
    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, RoomEntity, RoomEntity.id, len(rooms) + 1)  # type: ignore
    # Commit all changes
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    """Insert fake data the session automatically when test is run
    Note:
        This function runs automatically due to the fixture property 'autouse=True'
    """
    insert_fake_data(session)
    session.commit()
    yield
