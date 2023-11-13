import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatPageComponent } from './seat-page/seat-page.component';
import { SeatManageComponent } from './seat-manage/seat-manage.component';

const routes: Routes = [
  { path: '', component: SeatPageComponent },
  { path: 'seat-manage', component: SeatManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatRoutingModule {}