import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomManageComponent } from './room-manage/room-manage.component';
import { RoomPageComponent } from './room-page/room-page.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
/* UI Widgets */
import { RoomCard } from './widgets/room-card.widget';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RoomManageComponent, RoomPageComponent, RoomCard],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class RoomModule {}
