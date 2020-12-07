import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Products,
  StageBetweenRequest,
} from '../../../../../shared/models/calendar';
import { ArrozSecano } from '../../../../../shared/models/farm';
import { ConfigurationService } from '../../../../../shared/services/configuration.service';
import { CalendarChildren } from '../calendar-children.interface';
import { CalendarService } from '../calendar.service';
import { LandsService } from '../lands.service';

@Component({
  selector: 'app-burning-for-sowing',
  templateUrl: './burning-for-sowing.component.html',
  styleUrls: ['./burning-for-sowing.component.css'],
})
export class BurningForSowingComponent implements OnInit, CalendarChildren {
  submitted: boolean;
  segmentId: string;
  endTrackingDate: Date;
  startTrackingDate: Date;
  products: Products[];
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private landsService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService
  ) {
    this.segmentId = this.route.snapshot.data.segmentId;
    this.initAPI();
  }
  mode: 'edit' | 'view' | 'create' = 'view';
  files: FileList;
  get hasSave() {
    return this.mode !== 'view';
  }
  get hasFilesButton() {
    return this.mode !== 'view';
  }
  textBack = 'Ir a segmentos';
  hasEndTrackingDate = true;
  hasStartTrackingDate = true;
  hasReferencePhoto = true;
  urlReferencePhoto = ''; // change after
  referencePhotoSelected: CalendarChildren['referencePhotoSelected'] = 'after';

  burningForSowingForm: FormGroup = this.fb.group({
    observations: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    application_date: [{ value: '', disabled: this.mode === 'view' }, []],
    products: [
      { value: [], disabled: this.mode === 'view' },
      [Validators.required],
    ],
  });

  get controls() {
    return this.burningForSowingForm.controls;
  }

  // FIXME: implement & integrate with API
  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.burningForSowingForm.markAllAsTouched();

    console.debug('BurningForSowingComponent:onSave', {
      form: this.burningForSowingForm,
      valid: this.burningForSowingForm.valid,
      files: this.files,
    });

    const values = this.burningForSowingForm.value;
    if (!this.burningForSowingForm.valid) {
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
    }
    this.configurationService.setLoadingPage(true);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        const dataRequest: StageBetweenRequest = {
          // tslint:disable-next-line: radix
          land_id: parseInt(this.landsService.idLand),
          ...values,
        };
        if (filesSaved) {
          dataRequest.images = filesSaved;
        }
        return this.calendarService.setBurnStage(dataRequest);
      })
      .then(
        (message) =>
          message &&
          this.snackBar.open(message, 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          })
      )
      .then(() => this.initAPI())
      .finally(() => {
        this.configurationService.setLoadingPage(false);
      });
  }

  onBack() {
    this.router.navigate([
      '/farms/calendar/',
      this.landsService.idProperty,
      this.landsService.idLand,
      'list',
    ]);
  }
  onChangeFiles(files: FileList) {
    this.files = files;
  }

  onClickAfterReferencePhoto() {
    this.referencePhotoSelected = 'after';
    this.urlReferencePhoto = this.getUrlReferencePhoto();
  }

  onClickBeforeReferencePhoto() {
    this.referencePhotoSelected = 'before';
    this.urlReferencePhoto = this.getUrlReferencePhoto();
  }

  getUrlReferencePhoto() {
    const sowingSystem =
      this.landsService.landSelected.sowing_system === new ArrozSecano().id
        ? 'arroz_secano'
        : 'arroz_riego';

    return `../../../../../../assets/img/segments/${sowingSystem}/${this.segmentId}/${this.referencePhotoSelected}.jpg`; // change after
  }

  ngOnInit(): void {
    this.init();
  }

  initAPI() {
    return this.calendarService
      .getStage(this.segmentId, this.landsService.idLand)
      .then((stageOneData) => this.init(stageOneData))
      .then(() =>
        this.calendarService.getProducts(
          this.landsService.idLand,
          this.segmentId
        )
      )
      .then((products) => (this.products = products));
  }

  init({
    observations = '',
    application_date = '',
    products = [],
    enabled = false,
    end_traking_date = '',
    start_traking_date = '',
  } = {}) {
    this.mode = enabled ? 'edit' : 'view';
    // ? ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.endTrackingDate = end_traking_date && new Date(end_traking_date);
      this.startTrackingDate =
        start_traking_date && new Date(start_traking_date);
      this.urlReferencePhoto = this.getUrlReferencePhoto();
    }, 1);

    this.configurationService.disableForm(
      this.burningForSowingForm,
      this.mode === 'view'
    );
    this.burningForSowingForm.patchValue({
      observations,
      application_date: application_date && new Date(application_date),
      products,
    });
  }
}
