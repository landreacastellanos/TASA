import { Injectable } from '@angular/core';
import {
  StageProduct,
  StageBetweenRequest,
  StageBetweenResponse,
  StageOneRequest,
  StageOneResponse,
  UploadFileResponse,
} from 'src/app/shared/models/calendar';
import { DataApiService } from '../../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {

  constructor(private dataApiService: DataApiService) { }

  getProducts(
    idLand: string | number,
    segmentId: string | number
  ): Promise<StageProduct[]> {
    return this.dataApiService
      .getAll(`get_product?id_land=${idLand}&id_stage=${segmentId}`)
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }

  getStageOne(landId: string | number): Promise<StageOneResponse> {
    return this.dataApiService
      .getAll('get_stage_one?land_id=' + landId)
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }

  getStage(
    stage: string | number,
    landId: string | number
  ): Promise<StageBetweenResponse> {
    return (
      this.dataApiService
        .getAll(`get_stage?land_id=${landId}&stage_number=${stage}`)
        .then((dataResponse) => {
          return dataResponse[0];
        })
        // FIXME: Only for test
        .then(() => ({
          application_date: '2020-10-11T05:00:00.000Z',
          enabled: true,
          end_traking_date: '2020-10-20T05:00:00.000Z',
          start_traking_date: '2020-10-28T05:00:00.000Z',
          observations: 'Está como feo el arroz',
          products: [
            {
              color: 'Verde',
              commercial_name: 'Cosmo agua',
              concentration: '0,05',
              dose_by_ha: 1.9,
              formulator: 'Solitec',
              id: 110,
              ing_active: 'Bacterias',
              presentation: '1 y Lts',
              provider: 'Solitec',
              segment: 'Bactericida',
            },
          ],
        }))
    );
  }

  setStageOne(data: StageOneRequest): Promise<string> {
    return this.dataApiService
      .post(data, 'set_stage_one')
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }

  setBurnStage(data: StageBetweenRequest): Promise<string> {
    console.debug('CalendarService:setBurnStage', { data });
    return Promise.resolve('FIXME: API NOT INTEGRATED');
    // FIXME: add correct implementation
    // this.dataApiService
    //   .post(data, '????')
    //   .then((dataResponse) => {
    //     return dataResponse[0];
    //   });
  }

  uploadFiles(files: FileList): Promise<UploadFileResponse> {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append(`image_${index + 1}`, element);
    }
    return this.dataApiService
      .postMultipart(formData, 'upload_file')
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }
}
