import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarActivitiesComponent } from './calendar-activities.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { CommonModule } from '@angular/common';
import { ListEventsComponent } from './list-events/list-events.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import moment from 'moment';
import { SharedDateModule } from '../../../shared/modules/shared-date.module';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    SharedDateModule
  ],
  exports: [
    CalendarHeaderComponent,
    CalendarActivitiesComponent,
    ListEventsComponent,
  ],
  declarations: [
    CalendarHeaderComponent,
    CalendarActivitiesComponent,
    ListEventsComponent,
  ],
})
export class CalendarActivitiesModule {}
