# Technical Specification Document

## API Routes

### backend/api/rooms.py

- get: get_rooms to return a list of rooms
- post: new_room to generate a new room

## Backend Service Functions

### backend/services/room.py

- all() to return list of rooms in database
- create() to create a room and add it to database

## Technical/ User Experience Design

- We decided to include a button in the room page that routes the user to a room manage page where they can add and edit rooms. The alternative would be to have this link in the navigation sidebar, which wouldn't be as user friendly.

## Development Concerns

### Frontend

Room- represented in navigation sidebar; not yet filtered for authorization

- room-page component
  - displays list of rooms in database
  - contains link to room-manage page (ADD ROOM button)
- room-manage component (place to edit/add rooms)
  - contains a form that allows users to add a room to the database
- room card widget
  - displays room info
  - has "view seats", "edit room", "delete room" (not yet connected)
- room model
- room module
- room service

Seat- very skeletal so far, will eventually contain seat information for each room

- seat-page component
- seat-manage component
- seat model
- seat module
- seat service

### Backend

- so far have implemented the API and service methods detailed above
- models and entities were available to us in the code base; we have not yet found anything we need to add
