import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
