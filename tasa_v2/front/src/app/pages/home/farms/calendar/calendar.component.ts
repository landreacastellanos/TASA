import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
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
    public landsService: LandsService,
    public configService: ConfigurationService,
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
    // tslint:disable-next-line: no-unused-expression
    (this.outlet?.component as CalendarChildren)?.onBack &&
      (this.outlet?.component as CalendarChildren).onBack();
  }

  onSave() {
    console.debug('CalendarComponent:onSave');
    // tslint:disable-next-line: no-unused-expression
    (this.outlet?.component as CalendarChildren)?.onSave &&
      (this.outlet?.component as CalendarChildren).onSave();
  }

  onChangeFiles(files: FileList) {
    console.debug('CalendarComponent:onChangeFiles', { files });
    // tslint:disable-next-line: no-unused-expression
    (this.outlet?.component as CalendarChildren)?.onChangeFiles &&
      (this.outlet?.component as CalendarChildren).onChangeFiles(files);
  }

  get hasSave() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasSave;
  }

  get textBack() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.textBack;
  }

  get hasFilesButton() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasFilesButton;
  }

  get hasReferencePhoto() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasReferencePhoto;
  }
  get urlReferencePhoto() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.urlReferencePhoto;
  }
  onClickBeforeReferencePhoto() {
    console.debug('CalendarComponent:onClickBeforeReferencePhoto');
    // tslint:disable-next-line: no-unused-expression
    (this.outlet?.component as CalendarChildren)?.onClickBeforeReferencePhoto &&
      (this.outlet
        ?.component as CalendarChildren).onClickBeforeReferencePhoto();
  }
  onClickAfterReferencePhoto() {
    console.debug('CalendarComponent:onClickBeforeReferencePhoto');
    // tslint:disable-next-line: no-unused-expression
    (this.outlet?.component as CalendarChildren)?.onClickAfterReferencePhoto &&
      (this.outlet?.component as CalendarChildren).onClickAfterReferencePhoto();
  }
  
  get referencePhotoSelected() {
    // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.referencePhotoSelected;
  }

  get hasEndTrackingDate(){
        // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasEndTrackingDate;
  }
  get endTrackingDate(){
        // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.endTrackingDate;
  }
  get hasStartTrackingDate(){
        // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.hasStartTrackingDate;
  }
  get startTrackingDate(){
        // tslint:disable-next-line: no-unused-expression
    return (this.outlet?.component as CalendarChildren)?.startTrackingDate;
  }
}
