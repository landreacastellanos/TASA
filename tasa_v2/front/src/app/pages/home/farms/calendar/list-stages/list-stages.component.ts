import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArrozDeRiego, ArrozSecano } from 'src/app/shared/models/farm';
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

  constructor(private router: Router, public landsService: LandsService) { }

  onBack() {
    this.router.navigate(['/']);
  }

  async ngOnInit(): Promise<void> {
    this.list = await this.landsService.getListCalendar();
  }

  public color(complete: boolean) {
    return complete ? 'color-red' : 'color-green';
  }

  public goItem(item) {
    this.router.navigate(['/farms/calendar/', this.landsService.idProperty, this.landsService.idLand, item.stage_number]);
  }
}
