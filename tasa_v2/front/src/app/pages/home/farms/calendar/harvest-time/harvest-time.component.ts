import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrozSecano } from '../../../../../shared/models/farm';
import { StageHarvestRequest } from '../../../../../shared/models/calendar';
import { ConfigurationService } from '../../../../../shared/services/configuration.service';
import { CalendarService } from '../calendar.service';
import { LandsService } from '../lands.service';

@Component({
  selector: 'app-harvest-time',
  templateUrl: './harvest-time.component.html',
  styleUrls: ['./harvest-time.component.css'],
})
export class HarvestTimeComponent implements OnInit {
  public mode: 'edit' | 'view' | 'create' = 'view';
  submitted: boolean;
  files: FileList;
  segmentId: string;
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
    this.intAPI();
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
        this.landsService?.landSelected?.sowing_system
      ] || ''
    );
  }

  harvestTimeForm: FormGroup = this.fb.group({
    amount_quintals: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    observations: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    harvest_date: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
  });

  ngOnInit(): void {
    this.init();
  }

  init({
    amount_quintals = '',
    observations = '',
    harvest_date = '',
    enabled = true,
  } = {}) {
    this.mode = enabled ? 'edit' : 'view';
    this.configurationService.disableForm(
      this.harvestTimeForm,
      this.mode === 'view'
    );
    this.harvestTimeForm.patchValue({
      observations,
      amount_quintals,
      harvest_date: harvest_date && new Date(harvest_date),
    });
  }

  intAPI() {
    // FIXME:
    return this.calendarService
      .getStage(this.segmentId, this.landsService.idLand)
      .then((stageOneData) => {
        this.init(stageOneData);
      });
  }

  get controls() {
    return this.harvestTimeForm.controls;
  }

  onChangeFiles(files: FileList) {
    this.files = files;
  }

  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.harvestTimeForm.markAllAsTouched();

    console.debug('HarvestTimeComponent:onSave', {
      form: this.harvestTimeForm,
      valid: this.harvestTimeForm.valid,
      files: this.files,
    });

    const values = this.harvestTimeForm.value;
    if (!this.harvestTimeForm.valid) {
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
    }
    this.configurationService.setLoadingPage(true);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        const dataRequest: StageHarvestRequest = {
          // tslint:disable-next-line: radix
          land_id: parseInt(this.landsService.idLand),
          ...values,
        };
        if (filesSaved) {
          dataRequest.images = filesSaved;
        }
        return this.calendarService.setStageHarvest(dataRequest);
      })
      .then(
        (message) =>
          message &&
          this.snackBar.open(message, 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          })
      )
      .then(() => this.intAPI())
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
}
