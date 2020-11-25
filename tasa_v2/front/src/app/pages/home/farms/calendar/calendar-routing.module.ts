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
      { path: '1', component: SeedtimeComponent,}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
