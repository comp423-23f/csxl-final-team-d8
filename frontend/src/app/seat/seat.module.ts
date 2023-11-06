import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatRoutingModule } from './seat-routing.module';
import { SeatPageComponent } from './seat-page/seat-page.component';
import { SeatManageComponent } from './seat-manage/seat-manage.component';



@NgModule({
  declarations: [
    SeatPageComponent,
    SeatManageComponent
  ],
  imports: [
    CommonModule,
    SeatRoutingModule
  ]
})
export class SeatModule { }
