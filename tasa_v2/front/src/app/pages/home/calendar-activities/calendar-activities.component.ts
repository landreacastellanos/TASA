import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { Activity, getRandomListDate } from './calendar-activities.model';
import moment, { Moment } from 'moment';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { ListEventsComponent } from './list-events/list-events.component';

@Component({
  selector: 'app-calendar-activities',
  templateUrl: './calendar-activities.component.html',
  styleUrls: ['./calendar-activities.component.scss'],
})
export class CalendarActivitiesComponent implements OnInit {
  locale: string = 'es-CO';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  // weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  view: CalendarView = CalendarView.Month;
  viewDate: moment.Moment = moment();
  events: CalendarEvent<Activity>[] = getRandomListDate();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onDayClicked(event: {
    day: CalendarMonthViewDay;
    sourceEvent: MouseEvent | any;
  }) {
    console.debug('CalendarActivitiesComponent:onDayClicked', { event });
    let dialogRef = this.dialog.open(ListEventsComponent, {
      // height: '200px',
      width: '95vw',
      maxHeight: '90vh',
      data: event.day,
    });
  }
}
