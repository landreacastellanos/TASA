import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CalendarChildren } from './calendar-children.interface';
import { LandsService } from './lands.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public landsService: LandsService
  ) {
    this.landsService.idProperty = this.route.snapshot.paramMap.get(
      'idProperty'
    );
    this.landsService.idLand = this.route.snapshot.paramMap.get('idLand');
    this.landsService.getLandById(
      this.landsService.idProperty,
      this.landsService.idLand
    );
  }

  @ViewChild(RouterOutlet, { static: true }) outlet;

  ngOnInit(): void {}

  onBack() {
    console.log('onBack');
  }

  onSave() {
    console.debug('CalendarComponent:onSave');
    // tslint:disable-next-line: no-unused-expression
    this.outlet?.component?.onSave && this.outlet?.component?.onSave();
  }

  get hasSave() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasSave;
  }

  get textBack() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.textBack;
  }
}
