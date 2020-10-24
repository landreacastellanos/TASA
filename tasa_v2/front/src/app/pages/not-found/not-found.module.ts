import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    NotFoundRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [NotFoundComponent]
})
export class NotFoundModule { }
