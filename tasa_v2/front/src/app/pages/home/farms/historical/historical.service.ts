import { Injectable } from '@angular/core';
import {
  StageBetweenRequest,
  StageHarvestRequest,
  StageOneRequest,
} from '../../../../shared/models/calendar';
import {
  Historical,
  HistoricalDetail,
} from '../../../../shared/models/Historic';

@Injectable({
  providedIn: 'root',
})
export class HistoricalService {
  constructor() {}

  getListHistorical(): Promise<Historical[]> {
    console.error('FIXME: getListHistorical: NOT_IMPLEMENTED');
    return Promise.resolve([
      {
        title: 'Historico prueba 2021',
        id: 23,
      },
    ]);
  }

  getHistoricalById(id: number | string): Promise<HistoricalDetail> {
    console.error('FIXME: getHistoricalById: NOT_IMPLEMENTED', id);
    const testImages = [
      'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
    ];
    const segmentOne: StageOneRequest = {
      real_date: '2021-01-23T05:00:00.000Z',
      sowing_date: '2021-01-14T05:00:00.000Z',
      type_sowing: 'Siembra con arroz tapado',
      variety: 'Hbdndu',
      images: testImages,
      land_id: 22,
    };

    const getStageBetween: (dayOffset: number) => StageBetweenRequest = (
      dayOffset
    ) => {
      return {
        application_date: `2021-01-${dayOffset + 2}T05:00:00.000Z`,
        end_traking_date: `2021-01-${dayOffset}T10:00:00.000Z`,
        images: testImages,
        observations: 'observacin',
        products: [
          {
            color: 'N/D',
            commercial_name: 'Cosmo agua',
            concentration: 'N/D',
            dose_by_ha: 0.1,
            formulator: 'Cosmoagro',
            id: 85,
            ing_active: 'Regulador de ph',
            presentation: '1 Kg',
            provider: 'Cosmoagro',
            segment: 'Regulador de ph',
          },
          {
            color: 'N/D',
            commercial_name: 'Cosmo In D',
            concentration: 'N/D',
            dose_by_ha: 0.2,
            formulator: 'Cosmoagro',
            id: 86,
            ing_active: 'Coadyuvante',
            presentation: '1 lt,4 lt, 20 Lts',
            provider: 'Cosmoagro',
            segment: 'Coadyuvante',
          },
          {
            color: 'Verde',
            commercial_name: 'Tornado 48 SL',
            concentration: '480 grs',
            dose_by_ha: 4,
            formulator: 'ABY tech SA',
            id: 87,
            ing_active: 'Glifosato',
            presentation: '19 lts',
            provider: 'Sunjoycrop',
            segment: 'Herbicida',
          },
        ],
        start_traking_date: `2021-01-${dayOffset + 4}T10:00:00.000Z`,
        land_id: 22,
        stage_number: dayOffset,
      };
    };

    const segmentHarvest: StageHarvestRequest = {
      amount_quintals: 20,
      amount_quintals_ha: 270,
      harvest_date: '2021-01-15T10:00:00.000Z',
      observations: 'harvest observations',
      stage_number: 15,
      images: testImages,
      land_id: 22,
    };

    return Promise.resolve({
      title: 'Historico prueba 2021',
      id: 23,
      owner: { id: 22, name: 'Pancho Jimenez' },
      seller: { id: 23, name: 'Camilo Guerrero' },
      segments: [
        segmentOne,
        getStageBetween(2),
        getStageBetween(3),
        getStageBetween(4),
        getStageBetween(5),
        getStageBetween(6),
        getStageBetween(7),
        getStageBetween(8),
        getStageBetween(9),
        getStageBetween(10),
        getStageBetween(11),
        getStageBetween(12),
        getStageBetween(13),
        getStageBetween(14),
        segmentHarvest
      ],
    } as HistoricalDetail);
  }
}
