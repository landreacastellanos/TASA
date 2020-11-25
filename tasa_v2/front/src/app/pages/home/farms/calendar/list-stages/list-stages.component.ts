import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarChildren } from '../calendar-children.interface';
import { LandsService } from '../lands.service';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss'],
})
export class ListStagesComponent implements OnInit, CalendarChildren {
  public list;
  textBack = 'Volver al inicio';

  constructor(private router: Router, public landsService: LandsService) {}

  onBack() {
    this.router.navigate(['/']);
  }

  async ngOnInit(): Promise<void> {
    this.list = await this.landsService.getListCalendar();
  }
}
