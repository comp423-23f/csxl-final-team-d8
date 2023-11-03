import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatRoutingModule } from './seat-routing.module';
import { SeatPageComponent } from './seat-page/seat-page.component';


@NgModule({
  declarations: [
    SeatPageComponent
  ],
  imports: [
    CommonModule,
    SeatRoutingModule
  ]
})
export class SeatModule { }
