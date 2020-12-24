import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import moment from 'moment';
import { CalendarActivitiesModule } from './calendar-activities/calendar-activities.module';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCO);
moment.locale('es-CO');
@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    CalendarActivitiesModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
