import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import moment, { Moment } from 'moment';
import { CalendarActivitiesComponent } from './calendar-activities/calendar-activities.component';
import { CalendarHeaderComponent } from './calendar-activities/demo-utils/calendar-header.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsCO from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCO);

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

moment.locale('es-CO');
@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    CalendarActivitiesComponent,
    CalendarHeaderComponent
  ],
  imports: [
    HomeRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    CommonModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
