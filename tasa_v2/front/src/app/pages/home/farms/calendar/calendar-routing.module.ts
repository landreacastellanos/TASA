import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrozDeRiego, ArrozSecano } from '../../../../shared/models/farm';
import { BurningForSowingComponent } from './burning-for-sowing/burning-for-sowing.component';
import { CalendarComponent } from './calendar.component';
import { ListStagesComponent } from './list-stages/list-stages.component';
import { SeedtimeComponent } from './seedtime/seedtime.component';

const titlesArrozSecano = [
  'Fecha de Siembra',
  'Quema para siembra',
  'Tratamiento de semillas',
  'Pre-emergencia total',
  'Post emergencia tempra',
  'Fertilizancion # 1',
  'Post emergencia tardia',
  'Fertilizancion # 2',
  'Control de enfermedades -Preventiva ó Intermedia',
  'Fertilizancion # 3',
  'Control de enfermedades - Preventiva',
  'Fertilizancion # 4',
  'Control de enfermedades - Embuchamieto',
  'Proteccion de espiga ',
  'Fecha de Cosecha',
];

const titleArrozRiego = [
  'Fecha de Siembra',
  'Quemas para siembra',
  'Tratamiento de semillas ',
  'Pre-emergencia total',
  'Post emergencia tempra',
  'Fertilizancion de siembra # 1',
  'Post emergencia tardia',
  'Fertilizancion # 2',
  'Control de hongos - Pre-preventiva',
  'Fertilización #3',
  'Preventiva',
  'Fertilizanción #4',
  'Aplicacion de Embuchamiento',
  'Proteccion de Espiga o de grano ',
  'Fecha de Cosecha',
];

const routes: Routes = [
  {
    path: ':idProperty/:idLand',
    component: CalendarComponent,
    children: [
      { path: '', component: ListStagesComponent },
      { path: 'list', component: ListStagesComponent },
      {
        path: '1',
        component: SeedtimeComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[1],
            [new ArrozSecano().id]: titlesArrozSecano[1],
          },
        },
      },
      {
        path: '2',
        component: BurningForSowingComponent,
        data: {
          segmentId: 2,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[2],
            [new ArrozSecano().id]: titlesArrozSecano[2],
          },
        },
      },
      {
        path: '3',
        component: BurningForSowingComponent,
        data: {
          segmentId: 3,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[3],
            [new ArrozSecano().id]: titlesArrozSecano[3],
          },
        },
      },

      {
        path: '4',
        component: BurningForSowingComponent,
        data: {
          segmentId: 4,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[4],
            [new ArrozSecano().id]: titlesArrozSecano[4],
          },
        },
      },
      {
        path: '5',
        component: BurningForSowingComponent,
        data: {
          segmentId: 5,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[5],
            [new ArrozSecano().id]: titlesArrozSecano[5],
          },
        },
      },
      {
        path: '6',
        component: BurningForSowingComponent,
        data: {
          segmentId: 6,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[6],
            [new ArrozSecano().id]: titlesArrozSecano[6],
          },
        },
      },
      {
        path: '7',
        component: BurningForSowingComponent,
        data: {
          segmentId: 7,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[7],
            [new ArrozSecano().id]: titlesArrozSecano[7],
          },
        },
      },
      {
        path: '8',
        component: BurningForSowingComponent,
        data: {
          segmentId: 8,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[8],
            [new ArrozSecano().id]: titlesArrozSecano[8],
          },
        },
      },
      {
        path: '9',
        component: BurningForSowingComponent,
        data: {
          segmentId: 9,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[9],
            [new ArrozSecano().id]: titlesArrozSecano[9],
          },
        },
      },
      {
        path: '10',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[10],
            [new ArrozSecano().id]: titlesArrozSecano[10],
          },
        },
      },
      {
        path: '11',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[11],
            [new ArrozSecano().id]: titlesArrozSecano[11],
          },
        },
      },
      {
        path: '12',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[12],
            [new ArrozSecano().id]: titlesArrozSecano[12],
          },
        },
      },
      {
        path: '13',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[13],
            [new ArrozSecano().id]: titlesArrozSecano[13],
          },
        },
      },
      {
        path: '14',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[14],
            [new ArrozSecano().id]: titlesArrozSecano[14],
          },
        },
      },
      {
        path: '15',
        component: BurningForSowingComponent,
        data: {
          segmentId: 1,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[1],
            [new ArrozSecano().id]: titlesArrozSecano[15],
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
