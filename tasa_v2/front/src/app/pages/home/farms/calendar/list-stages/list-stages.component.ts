import { Component, OnInit } from '@angular/core';
import { CalendarChildren } from '../calendar-children.interface';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.css'],
})
export class ListStagesComponent implements OnInit, CalendarChildren {
  constructor() {}

  onBack() {
    console.log('im backking');
  }

  ngOnInit(): void {}
}
