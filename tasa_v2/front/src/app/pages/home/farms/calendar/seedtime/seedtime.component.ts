import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seedtime',
  templateUrl: './seedtime.component.html',
  styleUrls: ['./seedtime.component.scss'],
})
export class SeedtimeComponent implements OnInit {
  constructor(public fb: FormBuilder) {}
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
      real_date: ['', [Validators.required]]
    });
  }
}
