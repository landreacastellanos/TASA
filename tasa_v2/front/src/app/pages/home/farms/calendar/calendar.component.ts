import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
    this.landsService.getLandById(
      this.route.snapshot.paramMap.get('idProperty'),
      this.route.snapshot.paramMap.get('idLand')
    );
  }

  @ViewChild(RouterOutlet, { static: true }) outlet;

  ngOnInit(): void {
    console.log(this.router.url);
  }

  onBack() {
    this.outlet?.component?.onBack();
  }

  onSave() {
    // tslint:disable-next-line: no-unused-expression
    this.outlet?.component?.onSave && this.outlet?.component?.onSave();
  }
}
