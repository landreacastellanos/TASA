import { Injectable } from '@angular/core';
import { StageOneResponse } from 'src/app/shared/models/calendar';
import { LandResponse } from '../../../../shared/models/lands';
import { DataApiService } from '../../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private dataApiService: DataApiService) {}

  getStageOne(landId: string | number): Promise<StageOneResponse> {
    return this.dataApiService
      .getAll('get_stage_one?land_id=' + landId)
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }
}
