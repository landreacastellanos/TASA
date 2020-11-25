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
import { ConfigurationService } from '../../../../../shared/services/configuration.service';

@Component({
  selector: 'app-seedtime',
  templateUrl: './seedtime.component.html',
  styleUrls: ['./seedtime.component.scss'],
})
export class SeedtimeComponent implements OnInit, CalendarChildren {
  public mode: 'edit' | 'view' | 'create' = 'view';
  submitted: boolean;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private landService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService
  ) {
    this.calendarService
      .getStageOne(this.landService.idLand)
      .then((stageOneData) => {
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
  seedTimeForm: FormGroup = this.fb.group({
    type_sowing: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    variety: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    sowing_date: [{ value: '', disabled: this.mode === 'view' }, []],
    real_date: [{ value: '', disabled: this.mode === 'view' }, []],
  });
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
    this.configurationService.disableForm(
      this.seedTimeForm,
      this.mode === 'view'
    );
    this.seedTimeForm.patchValue({
      type_sowing,
      variety,
      sowing_date: new Date(sowing_date),
      real_date: new Date(real_date),
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

  get controls() {
    return this.seedTimeForm.controls;
  }

  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.seedTimeForm.markAllAsTouched();

    console.debug('SeedtimeComponent:onSave', {
      form: this.seedTimeForm,
      valid: this.seedTimeForm.valid,
    });
  }

  public disabledForm() {
    const keys = Object.keys(this.seedTimeForm.value);
    keys.forEach((element) => {
      this.mode === 'view'
        ? this.seedTimeForm.get(element).disable()
        : this.seedTimeForm.get(element).enable();
    });
  }
  onBack() {
    this.router.navigate(['/']);
  }
}
