import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarMonthViewDay } from 'angular-calendar';
import moment from 'moment';
import { Activity } from '../calendar-activities.model';
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit {
  dataSource: MatTableDataSource<{ land: string; title: string}>;
  displayedColumns: string[] = ['property', 'land', 'title'];
  title: string;
  constructor(
    public dialogRef: MatDialogRef<ListEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarMonthViewDay
  ) {
    this.title = moment(data.date).format('LL');
    const listActivities = data.events
      .map((event) => event.meta as Activity)
      .map((activity) => ({
        property: `${activity.property_name}`,
        land: `${activity.land_name}`,
        title: activity.stage_name,
      }));
    this.dataSource = new MatTableDataSource(listActivities);
  }

  ngOnInit(): void {}
}
