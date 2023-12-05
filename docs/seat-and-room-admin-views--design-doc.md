# Seat and Room Administration View Design Document

## Credits

This project is brought to you by our amazing team D8:

- [Nathan Flinchum](https://github.com/nathanlf)
- [Malak Hannosh](https://github.com/malakhannosh)
- [Maya Theresa Gopal](https://github.com/mayather)
- [Aknazar Janibek](https://github.com/ajanibekcode)

## Overview

- CSXL Managers can easily manage and view information regarding rooms and their accompanying seats from a "Rooms" tab on the website's sidebar.
- This feature enables CSXL managers to add, delete, and edit CSXL spaces with a UI.

## Personas

### Amy Ambassador

- An ambassador of CSXL who works to assist in maintaining facilities, checking in and managing users.
- Maintains success of the XL as an essential worker with some special permissions.

### Rhonda Root

- An administrator of CSXL with the ability to manage rooms and seats.
- Rhonda works to ensure the XL is run efficiently and professionally.

## User Stories

- As Amy Ambassador or Rhonda Root, I want to be able to:

  - view the list of rooms, so that I can quickly see all CSXL spaces.

  - select any given room and view its list of seats, so that I can quickly see all seats and their accompanying features in that room.

  - edit a room, so that I can easily update a room's information (ID number, nickname, building, room, capacity, reservable).

  - edit a seat, so that I can easily make changes to a seat's information (various features).

  - add a room to the list of rooms, so that I can easily keep track of any new CSXL spaces.

  - add a seat to any given room's list of seats, so that I can easily keep track of any new seats added to a room.

  - delete a room, so that I can easily update the list of rooms to exclude rooms no longer under CSXL use.

  - delete a seat from a room, so that I can easily update the room's list of seats to exclude seats no longer under CSXL use for that room.

## Wireframes / Mockups

[Figma Mockup](https://www.figma.com/file/xK2MeKeAjWPKylptcLgjIY/Untitled?type=design&node-id=0-1&mode=design&t=SmvHrcxg7oMe67RO-0)

- On the Rooms page, admins or ambassadors can see and search through the list of rooms. If they click Add Room or Edit Room on a specific room, they will be brought to a new page where they can create a new room/edit the room. If they click Delete Room, the room will be deleted. If they click on the room number, they will be redirected to that room’s seats page.

- On the Seat page, admins or ambassadors can see a list of the seats in a specific room. If they click Add Seat or Edit Seat on a specific seat, they will be taken to a new page where they can create a new seat, add features, and connect it to a room, or edit the seat’s fields. If they click a Delete Seat, the seat will be deleted.

## Technical Implementation Opportunities and Planning

- Focus on areas of the codebase that affect the user interface for displaying available rooms and seats. In the frontend directory, the admin and navigation components is the primary focus for creating views based on the persona and the ability to navigate a user towards a specific view.

- Anticipate using a component for the Admin and a component for the Student, so that based on the component, the persona either has the ability to change the amount of rooms or seats available or only be able to see what is available. Using widgets such as <mat-table> help with displaying a list of rooms and seats by having each row in the table represent a room or seat.

- Foresee the need for a “Room” model that contains an ID and an integer representing the number of seats, so that an administrator or root can alter this integer to add or delete seats.

- To be able to change the available seats whenever there is a seat taken or a seat has opened up, use routes such as POST and DELETE to notify the status of a specific room or seat. In terms of seeing the whole list of rooms and seats with their current status, use GET to retrieve the list.

- To ensure accurate rooms and seats available for reservation, the ability to edit available rooms and seat amounts should only be available to administrators and the root. Students and other non-administrative users should not be able to edit room and seat availability because it may not be accurate.

## Additional Docs

For a more in-depth understanding of the technical aspects and specifications of this project, please visit:

- [Technical Specification Document](seat-and-room-admin-views--spec.md)
