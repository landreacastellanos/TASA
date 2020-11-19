import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { ListStagesComponent } from './list-stages/list-stages.component';

const routes: Routes = [
        path: 'seedtime', component: SeedtimeComponent,
  {
    path: '',
    component: CalendarComponent,
    children: [
      { path: '', component: ListStagesComponent },
      { path: 'list', component: ListStagesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
