import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatRoutingModule } from './seat-routing.module';
import { SeatPageComponent } from './seat-page/seat-page.component';

/* Angular Material Modules */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
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
import { SeatCard } from './widgets/seat-card.widget';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SeatPageComponent, SeatCard],
  imports: [
    CommonModule,
    SeatRoutingModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatAutocompleteModule,
    MatIconModule
  ]
})
export class SeatModule {}
