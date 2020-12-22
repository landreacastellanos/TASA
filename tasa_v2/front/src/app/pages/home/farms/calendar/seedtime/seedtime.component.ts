import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import moment, { Moment } from 'moment';
import { LandsService } from '../lands.service';
import { ArrozSecano } from 'src/app/shared/models/farm';
import { CalendarService } from '../calendar.service';
import { CalendarChildren } from '../calendar-children.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../../../../shared/services/configuration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StageOneRequest } from '../../../../../shared/models/calendar';

@Component({
  selector: 'app-seedtime',
  templateUrl: './seedtime.component.html',
  styleUrls: ['./seedtime.component.scss'],
})
export class SeedtimeComponent implements OnInit, CalendarChildren {
  public mode: 'edit' | 'view' | 'create' = 'view';
  submitted: boolean;
  files: FileList;
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
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
  get hasFilesButton() {
    return this.mode !== 'view';
  }

  get title() {
    return (
      this.route.snapshot.data.title[
      this.landService?.landSelected?.sowing_system
      ] || ''
    );
  }

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
      sowing_date: sowing_date && moment(sowing_date),
      real_date: real_date && moment(real_date),
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

  onChangeFiles(files: FileList) {
    this.files = files;
  }

  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.seedTimeForm.markAllAsTouched();

    console.debug('SeedtimeComponent:onSave', {
      form: this.seedTimeForm,
      valid: this.seedTimeForm.valid,
      files: this.files,
    });

    const values = this.seedTimeForm.value;
    if (!this.seedTimeForm.valid) {
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
    }
    this.configurationService.setLoadingPage(true);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        const dataRequest: StageOneRequest = {
          // tslint:disable-next-line: radix
          land_id: parseInt(this.landService.idLand),
          ...values,
        };
        if (filesSaved) {
          dataRequest.images = filesSaved;
        }
        return this.calendarService.setStageOne(dataRequest);
      })
      .then(
        (message) =>
          message &&
          this.snackBar.open(message, 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          })
      )
      .then(() => this.calendarService.getStageOne(this.landService.idLand))
      .then((stageOneData) => {
        this.init(stageOneData);
      })
      .finally(() => {
        this.configurationService.setLoadingPage(false);
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
    this.router.navigate([
      '/farms/calendar/',
      this.landService.idProperty,
      this.landService.idLand,
      'list',
    ]);
  }
}
