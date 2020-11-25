import { Injectable } from '@angular/core';
import {
  StageOneRequest,
  StageOneResponse,
} from 'src/app/shared/models/calendar';
import { LandResponse } from '../../../../shared/models/lands';
import { DataApiService } from '../../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private dataApiService: DataApiService) {}

  getStageOne(landId: string | number): Promise<StageOneResponse> {
    return (
      this.dataApiService
        .getAll('get_stage_one?land_id=' + landId)
        .then((dataResponse) => {
          return dataResponse[0];
        })
        // FIXME: remove me please, only for test
        // .then((dataResponse2) => {
        //   return {
        //     enabled: true,
        //     real_date:
        //       'Tue Nov 22 2020 00:23:08 GMT-0500 (hora estándar de Colombia)',
        //     sowing_date:
        //       'Tue Nov 21 2020 00:23:08 GMT-0500 (hora estándar de Colombia)',
        //     type_sowing: 'Siembra con arroz tapado',
        //     variety: 'Arroz de diosito',
        //   };
        // })
    );
  }

  setStageOne(data: StageOneRequest): Promise<string> {
    return this.dataApiService
      .post(data, 'set_stage_one')
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }
}
