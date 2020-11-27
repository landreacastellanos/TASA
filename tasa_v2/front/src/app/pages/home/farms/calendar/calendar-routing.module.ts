import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      { path: '1', component: SeedtimeComponent },
      { path: '2', component: SeedtimeComponent },
      { path: '3', component: SeedtimeComponent },
      { path: '4', component: SeedtimeComponent },
      { path: '5', component: SeedtimeComponent },
      { path: '6', component: SeedtimeComponent },
      { path: '7', component: SeedtimeComponent },
      { path: '8', component: SeedtimeComponent },
      { path: '9', component: SeedtimeComponent },
      { path: '10', component: SeedtimeComponent },
      { path: '11', component: SeedtimeComponent },
      { path: '12', component: SeedtimeComponent },
      { path: '13', component: SeedtimeComponent },
      { path: '14', component: SeedtimeComponent },
      { path: '15', component: SeedtimeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
