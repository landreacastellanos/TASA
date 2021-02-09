import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalComponent } from './historical.component';
import { HistoricalRoutingModule } from './historical-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    HistoricalComponent,
  ],
  imports: [
    HistoricalRoutingModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class HistoricalModule {}
