import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomManageComponent } from './room-manage/room-manage.component';
import { RoomPageComponent } from './room-page/room-page.component';


@NgModule({
  declarations: [
    RoomManageComponent,
    RoomPageComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
