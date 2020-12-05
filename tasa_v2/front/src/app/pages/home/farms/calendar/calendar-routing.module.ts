import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BurningForSowingComponent } from './burning-for-sowing/burning-for-sowing.component';
import { CalendarComponent } from './calendar.component';
import { ListStagesComponent } from './list-stages/list-stages.component';
import { SeedtimeComponent } from './seedtime/seedtime.component';

const routes: Routes = [
  {
    path: ':idProperty/:idLand',
    component: CalendarComponent,
    children: [
      { path: '', component: ListStagesComponent },
      { path: 'list', component: ListStagesComponent },
      { path: '1', component: SeedtimeComponent, data: { segmentId: 1 } },
      {
        path: '3',
        component: BurningForSowingComponent,
        data: { segmentId: 3 },
      },
      {
        path: '2',
        component: BurningForSowingComponent,
        data: { segmentId: 2 },
      },
      { path: '4', component: SeedtimeComponent, data: { segmentId: 4 } },
      { path: '5', component: SeedtimeComponent, data: { segmentId: 5 } },
      { path: '6', component: SeedtimeComponent, data: { segmentId: 6 } },
      { path: '7', component: SeedtimeComponent, data: { segmentId: 7 } },
      { path: '8', component: SeedtimeComponent, data: { segmentId: 8 } },
      { path: '9', component: SeedtimeComponent, data: { segmentId: 9 } },
      { path: '10', component: SeedtimeComponent, data: { segmentId: 10 } },
      { path: '11', component: SeedtimeComponent, data: { segmentId: 11 } },
      { path: '12', component: SeedtimeComponent, data: { segmentId: 12 } },
      { path: '13', component: SeedtimeComponent, data: { segmentId: 13 } },
      { path: '14', component: SeedtimeComponent, data: { segmentId: 14 } },
      { path: '15', component: SeedtimeComponent, data: { segmentId: 15 } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
