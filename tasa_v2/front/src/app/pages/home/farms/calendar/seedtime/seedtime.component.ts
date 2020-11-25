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
import { CalendarChildren } from '../calendar-children.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seedtime',
  templateUrl: './seedtime.component.html',
  styleUrls: ['./seedtime.component.scss'],
})
export class SeedtimeComponent implements OnInit, CalendarChildren {
  public mode: 'edit' | 'view' | 'create' = 'view';
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private landService: LandsService,
    private calendarService: CalendarService
  ) {
    this.calendarService.getStageOne(this.landService.idLand).then((stageOneData) => {
      this.init(stageOneData);
    });
  }
  textBack = 'Ir a segmentos';
  get hasSave() {
    return this.mode !== 'view';
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
    this.init();
  }

  init({
    type_sowing = '',
    variety = '',
    sowing_date = '',
    real_date = '',
    enabled = false,
  } = {}) {
    this.mode = enabled ? 'edit' : 'view';
    this.seedTimeForm = this.fb.group({
      type_sowing: [
        { value: type_sowing, disabled: this.mode === 'view' },
        [Validators.required],
      ],
      variety: [
        { value: variety, disabled: this.mode === 'view' },
        [Validators.required],
      ],
      sowing_date: [
        { value: new Date(sowing_date), disabled: this.mode === 'view' },
        [Validators.required],
      ],
      real_date: [
        { value: new Date(real_date), disabled: this.mode === 'view' },
        [Validators.required],
      ],
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

  onSave() {
    console.error('FIXME: NOT IMPLEMENTED YET');
  }
  onBack() {
    this.router.navigate(['/']);
  }
}
