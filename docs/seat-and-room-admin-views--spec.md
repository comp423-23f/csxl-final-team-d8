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

- We decided to include a button in the room page that routes the user to a room manage page where they can add and edit rooms. The alternative would be to have this link in the navigation sidebar, which wouldn't be as clean.

## Development Concerns

### Frontend

Room- represented in navigation; not yet filtered for authorization

- room-page component (view of rooms)
  - contains link to room-manage page
- room-manage component (place to edit/add rooms)
- room card widget for displaying room info
- room model
- room module
- room service

Seat- very skeletal so far, not implemented or represented in navigation

- seat-page component
- seat-manage component
- seat model
- seat module
- seat service

### Backend

- so far have implemented the API and service methods detailed above
- models and entities were available to us in the code base; we have not yet found anything we need to add
