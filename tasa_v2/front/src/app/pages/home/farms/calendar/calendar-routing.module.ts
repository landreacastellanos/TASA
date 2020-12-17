import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrozDeRiego, ArrozSecano } from '../../../../shared/models/farm';
import { BurningForSowingComponent } from './burning-for-sowing/burning-for-sowing.component';
import { CalendarComponent } from './calendar.component';
import { HarvestTimeComponent } from './harvest-time/harvest-time.component';
import { ListStagesComponent } from './list-stages/list-stages.component';
import { SeedtimeComponent } from './seedtime/seedtime.component';

const titlesArrozSecano = [
  'EMPTY_STRING_TO AVOID_INDEX_0',
  'Fecha de Siembra',
  'Quema para siembra (5 a 8 días antes de la siembra)',
  'Tratamiento de semillas (0 a 3 días antes de la siembra )',
  'Pre-emergencia total (0 a 3 DDS)',
  'Post emergencia tempra (12 a 15 DDS)',
  'Fertilizancion # 1 (SIEMBRA o 13 a 16 DDS)',
  'Post emergencia tardia (20 a 25 DDS)',
  'Fertilizancion # 2 (22 a 25 DDS)',
  'Control de enfermedades (Preventiva o intermedia 25 a 28 DDS)',
  'Fertilizancion # 3 (33 a 38 DDS)',
  'Control de enfermedades (Preventiva de 40 a 45 DDS)',
  'Fertilizancion # 4 (48 a 50 DDS)',
  'Control de enfermedades (Embuchamieto 65 a 70 DDS)',
  'Proteccion de espiga (85 a 90 DDS)',
  'Fecha de cosecha (110 a 120) DDS',
];

const titleArrozRiego = [
  'EMPTY_STRING_TO AVOID_INDEX_0',
  'Fecha de Siembra',
  'Quemas para siembra (5 a 8 Días antes de la siembra)',
  'Tratamiento de semillas (1 a 2 días antes de la siembra)',
  'Pre-emergencia total (0 a 3 DDS)',
  'Post emergencia tempra (10 a 12 DDS)',
  'Fertilizancion de siembra # 1 (12 a 18 DDS)',
  'Post emergencia tardia (20 a 22 DDS)',
  'Fertilizancion # 2 (25 DDS)',
  'Control de hongos (Pre-preventiva 25 - 30 DDS)',
  'Fertilización #3 (30 a 38 DDS)',
  'Preventiva (45 a 48 DDS)',
  'Fertilizanción #4 (45 a 50 DDS)',
  'Aplicacion de Embuchamiento (65 a 70 DDS)',
  'Proteccion de espiga o de grano (85 - 90 DDS)',
  'Fecha de Cosecha (110 a 120 DDS)',
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
          segmentId: 10,
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
          segmentId: 11,
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
          segmentId: 12,
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
          segmentId: 13,
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
          segmentId: 14,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[14],
            [new ArrozSecano().id]: titlesArrozSecano[14],
          },
        },
      },
      {
        path: '15',
        component: HarvestTimeComponent,
        data: {
          segmentId: 15,
          title: {
            [new ArrozDeRiego().id]: titleArrozRiego[15],
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
