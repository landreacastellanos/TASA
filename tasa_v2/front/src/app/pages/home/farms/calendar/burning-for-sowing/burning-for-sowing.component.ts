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
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private landsService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService
  ) {}
  mode: 'edit' | 'view' | 'create' = 'view';
  files: FileList;
  get hasSave() {
    return this.mode !== 'view';
  }
  textBack = 'Ir a segmentos';
  hasFilesButton = true;
  burningForSowingForm: FormGroup = this.fb.group({
    type_sowing: [
      { observation: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
  });

  // FIXME: implement & integrate with API
  onSave?: () => any;

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
