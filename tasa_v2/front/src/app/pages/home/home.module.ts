import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
