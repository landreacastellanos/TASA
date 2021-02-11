import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { Activity } from './calendar-activities.model';
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
import { CalendarActivitiesService } from './calendar-activities.service';

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
  events: CalendarEvent<Activity>[];
  activities: Activity[];


  constructor(
    public dialog: MatDialog,
    public calendarActivitiesService: CalendarActivitiesService
    ) {}

  ngOnInit(): void {
    this.calendarActivitiesService.getActivities().then((activities)=> {
      this.activities= activities
      this.events= this.calendarActivitiesService.getDate(this.activities);
    })
  }

  onDayClicked(event: {
    day: CalendarMonthViewDay<Activity>;
    sourceEvent: MouseEvent | any;
  }) {
    console.debug('CalendarActivitiesComponent:onDayClicked', { event });
    let dialogRef = this.dialog.open(ListEventsComponent, {
      // height: '200px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: event.day,
    });
  }
}
