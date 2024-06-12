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
  textBack = 'Ir a lotes';
  showHistoricList = true;

  constructor(private router: Router, public landsService: LandsService) { }

  onBack() {
    this.router.navigate(['/farms/view/', this.landsService.idProperty]);
  }

  async ngOnInit(): Promise<void> {
    this.list = await this.landsService.getListCalendar();
  }

  public color(complete: boolean, air_application: boolean) {
    return complete ? (air_application? 'color-blue' : 'color-red') : 'color-green';
  }

  public goItem(item) {
    this.router.navigate(['/farms/calendar/', this.landsService.idProperty, this.landsService.idLand, item.stage_number]);
  }

  get title(){
    return `Calendario de los segmentos ${this.landsService?.typeRice?.name}`
  }
}
