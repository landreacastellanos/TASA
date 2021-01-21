import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalComponent } from './historical.component';
import { HistoricalRoutingModule } from './historical-routing.module';
@NgModule({
  declarations: [
    HistoricalComponent,
  ],
  imports: [
    HistoricalRoutingModule,
    CommonModule,
  ],
})
export class HistoricalModule {}
