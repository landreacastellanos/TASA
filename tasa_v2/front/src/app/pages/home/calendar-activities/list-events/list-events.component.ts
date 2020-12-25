import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarMonthViewDay } from 'angular-calendar';
import moment from 'moment'
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
})
export class ListEventsComponent implements OnInit {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<ListEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarMonthViewDay
  ) {
    this.title = moment(data.date).format('LL');

  }

  ngOnInit(): void {}
}
