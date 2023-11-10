## 0. Title & Team

    Team D8 - Seat & Room Administration

## 1. Overview

    This feature will make it so that managers can add, delete, and edit rooms and seats. This is valuable for managers to be able to represent changes in availability for seats and rooms.

## 2. Personas

    Amy Ambassador: An ambassador of CSXL who works at the front desk of the space, assisting in maintaining the XL as an essential worker with special permissions.

    Rhonda Root: An administrator of CSXL with the ability to manage rooms and seats. Rhonda works to ensure the XL is run efficiently and professionally.

## 3. User Stories

    As Amy Ambassador or Rhonda Root, I want to be able to view the list of rooms, so that I can quickly see all CSXL spaces.

    As Amy Ambassador or Rhonda Root, I want to be able to select any given room and view its list of seats, so that I can quickly see all seats and their accompanying features in that room.

    As Amy Ambassador or Rhonda Root, I want to be able to edit a room, so that I can easily update a room's information (ID number and nickname).

    As Amy Ambassador or Rhonda Root, I want to be able to edit a seat, so that I can easily make changes to a seat's information (ID number and available features).

    As Rhonda Root, I want to be able to add a room to the list of rooms, so that I can easily keep track of any new CSXL spaces.

    As Rhonda Root, I want to be able to add a seat to any given room's list of seats, so that I can easily keep track of any new seats added to a room.

    As Rhonda Root, I want to be able to delete a room, so that I can easily update the list of rooms to exclude rooms no longer under CSXL use.

    As Rhonda Root, I want to be able to delete a seat from a room, so that I can easily update the room's list of seats to exclude seats no longer under CSXL use for that room.

## 4. Wireframes / Mockups

    https://www.figma.com/file/xK2MeKeAjWPKylptcLgjIY/Untitled?type=design&node-id=0-1&mode=design&t=SmvHrcxg7oMe67RO-0

    On the Rooms page, admins or ambassadors can see and search through the list of rooms. If they click Add Room or Edit Room on a specific room, they will be brought to a new page where they can create a new room/edit the room. If they click Delete Room, the room will be deleted. If they click on the room number, they will be redirected to that room’s seats page.

    On the Seat page, admins or ambassadors can see a list of the seats in a specific room. If they click Add Seat or Edit Seat on a specific seat, they will be taken to a new page where they can create a new seat, add features, and connect it to a room, or edit the seat’s fields. If they click a Delete Seat, the seat will be deleted.

## 5. Technical Implementation Opportunities and Planning:

    1. We will mostly be focusing on the areas of the codebase that affect the user interface for displaying available rooms and seats. In the frontend directory, we will be dependent on the admin and navigation components for creating views based on the persona and the ability to navigate a user towards a specific view.

    2. We anticipate using a component for the Admin and a component for the Student, so that based on the component, the persona either has the ability to change the amount of rooms or seats available or only be able to see what is available. We anticipate using widgets such as <mat-table> which will help with displaying a list of rooms and seats by having each row in the table represent a room or seat.

    3. We foresee the need for a “Room” model that contains an ID and an integer representing the number of seats, so that an administrator or root can alter this integer to add or delete seats.

    4. To be able to change the available seats whenever there is a seat taken or a seat has opened up, we can use routes such as POST and DELETE to notify the status of a specific room or seat. In terms of seeing the whole list of rooms and seats with their current status, we can use GET, which can help us retrieve the list.

    5. To ensure accurate rooms and seats available for reservation, the ability to edit available rooms and seat amounts should only be available to administrators and the root. Students and other non-administrative users should not be able to edit room and seat availability because it may not be accurate.
