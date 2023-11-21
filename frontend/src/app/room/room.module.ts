import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomManageComponent } from './room-manage/room-manage.component';
import { RoomPageComponent } from './room-page/room-page.component';

/* Angular Material Modules */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { RoomFilterPipe } from './room-filter/room-filter.pipe';
//not sure if need below
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

/* UI Widgets */
import { RoomCard } from './widgets/room-card.widget';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
//import { RoomFilterPipe } from './room-filter.pipe';

@NgModule({
  declarations: [
    RoomManageComponent,
    RoomPageComponent,
    RoomCard,
    RoomFilterPipe
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    //not sure if need below
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatAutocompleteModule,
    MatIconModule
    //OrganizationRoutingModule,
    //RouterModule
  ]
})
export class RoomModule {}
