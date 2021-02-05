import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/shared/services/data-api.service';
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
  constructor(public dataApiService: DataApiService) {}

  getListHistorical(landId: string): Promise<Historical[]> {
    return this.dataApiService.getById('get_historical_land', landId);
  }

  getHistoricalById(historicalId: string): Promise<HistoricalDetail> {
    return (
      this.dataApiService
        .getById('get_historical', historicalId)
        .then((historic) => {
          return historic[0];
        })
        // Mapping token on images
        .then((historic: HistoricalDetail) => {
          const token = this.dataApiService.getToken();
          return {
            ...historic,
            segments: historic.segments.map((segment) => {
              return {
                ...segment,
                images: segment.images?.map(
                  (image) => `${image}?token=${token}`
                ),
              };
            }),
          };
        })
    );
  }
}
