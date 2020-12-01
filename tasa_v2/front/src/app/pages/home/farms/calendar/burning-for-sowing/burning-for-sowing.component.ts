import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private landsService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService
  ) {}
  mode: 'edit' | 'view' | 'create' = 'edit';
  files: FileList;
  get hasSave() {
    return this.mode !== 'view';
  }
  textBack = 'Ir a segmentos';
  hasFilesButton = true;
  burningForSowingForm: FormGroup = this.fb.group({
    observation: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    start_segment_date: [{ value: new Date(), disabled: this.mode === 'view' }, []],
    end_segment_date: [{ value: new Date(), disabled: this.mode === 'view' }, []],

  });

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

    if (!this.burningForSowingForm.valid) {
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }
    const values = this.burningForSowingForm.value;

    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        const dataRequest: any /* FIXME: StageOneRequest*/ = {
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
      );
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
  ngOnInit(): void {}
}
