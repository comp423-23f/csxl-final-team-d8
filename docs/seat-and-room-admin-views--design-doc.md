# Seat and Room Administration View Design Document

## Credits

This project is brought to you by our amazing team D8:

- [Nathan Flinchum](https://github.com/nathanlf)
- [Malak Hannosh](https://github.com/malakhannosh)
- [Maya Theresa Gopal](https://github.com/mayather)
- [Aknazar Janibek](https://github.com/ajanibekcode)

## Overview

This project addresses issues centered around not having enough space for students and admins/ambassadors working in a stressful environment. Implementation of the seat and room view allows time to be saved by providing a view for which rooms and seats are available in the building. CSXL Managers can easily manage and view information regarding rooms and their accompanying seats from a "Rooms" tab on the website's sidebar. This feature enables CSXL managers to add, delete, and edit CSXL spaces with a UI. Such features give admins and ambassadors a stronger feeling of control when it comes to checking in students for room and seat availability, thus alleviating their stress. When a view for students is eventually created, this feature will decrease the frequency of students showing up to a fully booked room and having to waiting for space to free up.

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

  - edit a room, so that I can easily update a room's information (nickname, building, room, capacity, reservable).

- As Rhonda Root **only**, I want to be able to:

  - add a room to the list of rooms, so that I can easily keep track of any new CSXL spaces.

  - delete a room, so that I can easily update the list of rooms to exclude rooms no longer under CSXL use.

## Wireframes / Mockups

[Figma Mockup](https://www.figma.com/file/xK2MeKeAjWPKylptcLgjIY/Untitled?type=design&node-id=0-1&mode=design&t=SmvHrcxg7oMe67RO-0) (initial design)

On the Rooms page, managers can see and search through the list of rooms using the search bar. If they click Add Room or Edit Room (now an edit room icon) on a specific room, they will be brought to a new page where they can create a new room/edit the room. If they click Delete Room (now a delete room icon), the room will be deleted. If they click on the room number, they will be redirected to that room’s seats page (in final design, they click on a View Seats button).

On the Seats page, managers can see a list of the seats in a specific room.

## Technical Implementation Opportunities and Planning

1. This project focuses on areas of the codebase that affect the user interface for displaying available rooms and seats. In the frontend directory, the admin and navigation components are the primary focus for creating views based on the persona and the ability to navigate a user towards a specific view.

2. This project requires the use of a component for the rooms to be listed and searched through (room-page), a component for a new room to be created or an existing room to be edited (room-manage), a page for the seats of a room to be listed and searched through (seat-page), and widgets for a room (room-card) and seat (seat-card).

3. Originally, we foresaw the need for a “Room” model that contains an ID and an integer representing the number of seats, so that an administrator could alter this integer to add or delete seats. Now, taking into account the fact that the room and seat models and entities were provided for us in backend, we added room and seat models to our frontend based off of those provided to us.

4. NEED TO EDIT!! To view the existing rooms and seats for a specific room, GET along with

To be able to change the available seats whenever there is a seat taken or a seat has opened up, use routes such as POST and DELETE to notify the status of a specific room or seat. In terms of seeing the whole list of rooms and seats with their current status, use GET to retrieve the list.

5. To ensure accurate rooms and seats available for reservation, the ability to view and edit available rooms and view seats should only be available to administrators and ambassadors. Administrators should be the only ones with the ability to add or delete a room. For now, students and other non-administrative users should not be able to add, edit, or delete because it may not be accurate.

## Additional Docs

For a more in-depth understanding of the technical aspects and specifications of this project, please visit:

- [Technical Specification Document](seat-and-room-admin-views--spec.md)
