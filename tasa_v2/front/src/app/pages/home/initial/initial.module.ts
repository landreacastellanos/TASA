import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InitialComponent } from './initial.component';
import { InitialRoutingModule } from './initial-routing.module';

@NgModule({
  declarations: [
    InitialComponent,
  ],
  imports: [
    InitialRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [InitialComponent]
})
export class InitialModule { }
