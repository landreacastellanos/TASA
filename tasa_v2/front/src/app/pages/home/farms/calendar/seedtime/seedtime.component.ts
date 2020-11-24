import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LandsService } from '../lands.service';
import { ArrozSecano } from 'src/app/shared/models/farm';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-seedtime',
  templateUrl: './seedtime.component.html',
  styleUrls: ['./seedtime.component.scss'],
})
export class SeedtimeComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private landService: LandsService,
    private calendarService: CalendarService
  ) {
    this.calendarService.getStageOne(13).then((stageOneData) => {
      const realStage = stageOneData.real_date;
      const alertita = stageOneData.enabled;
      console.log(realStage);
    });
  }
  
  /* form-control */
  name = new FormControl('');

  events: string[] = [];
  seedTimeForm: FormGroup;
  typeOfPlanting: string[] = [
    'Siembra con arroz tapado',
    'Siembra con arroz voleado',
  ];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  ngOnInit(): void {
    this.seedTimeForm = this.fb.group({
      type_sowing: ['', [Validators.required]],
      variety: ['', [Validators.required]],
      sowing_date: ['', [Validators.required]],
      real_date: ['', [Validators.required]],
    });
  }

  get imageReference() {
    if (this.landService.landSelected === undefined) {
      return '';
    }
    if (this.landService.landSelected.sowing_system === new ArrozSecano().id) {
      return 'assets/img/Siembra_Arroz_Secano.jpg';
    } else {
      return 'assets/img/Siembra_Arroz_Voleado.jpg';
    }
  }
}
