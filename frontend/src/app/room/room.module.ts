import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomManageComponent } from './room-manage/room-manage.component';
import { RoomPageComponent } from './room-page/room-page.component';

import { MatCardModule } from '@angular/material/card';
/* UI Widgets */
import { RoomCard } from './widgets/room-card.widget';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RoomManageComponent, RoomPageComponent, RoomCard],
  imports: [CommonModule, RoomRoutingModule]
})
export class RoomModule {}
