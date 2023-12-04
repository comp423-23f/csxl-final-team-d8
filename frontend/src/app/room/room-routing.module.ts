//The Room Routing Module holds all of the routes that are children to the path /rooms/...

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPageComponent } from './room-page/room-page.component';
import { RoomManageComponent } from './room-manage/room-manage.component';

const routes: Routes = [RoomPageComponent.Route, RoomManageComponent.Route];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule {}
