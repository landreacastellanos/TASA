import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { ListStagesComponent } from './list-stages/list-stages.component';
import { SeedtimeComponent } from './seedtime/seedtime.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BurningForSowingComponent } from './burning-for-sowing/burning-for-sowing.component';
import { SharedDateModule } from '../../../../shared/modules/shared-date.module';
@NgModule({
  declarations: [
    CalendarComponent,
    ListStagesComponent,
    SeedtimeComponent,
    BurningForSowingComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CalendarRoutingModule,
    MatExpansionModule,
    SharedDateModule,
  ],
})
export class CalendarModule {}
