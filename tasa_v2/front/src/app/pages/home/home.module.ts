import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { CalendarActivitiesModule } from './calendar-activities/calendar-activities.module';
import { MatButtonModule } from '@angular/material/button';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CalendarActivitiesModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
