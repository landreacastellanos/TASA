import { Injectable } from '@angular/core';
import {
  StageProduct,
  StageBetweenRequest,
  StageBetweenResponse,
  StageOneRequest,
  StageOneResponse,
  UploadFileResponse,
  StageHarvestRequest,
} from 'src/app/shared/models/calendar';
import { DataApiService } from '../../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private dataApiService: DataApiService) {}

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
    return this.dataApiService
      .getAll(`get_stage?land_id=${landId}&stage_number=${stage}`)
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }

  setStageOne(data: StageOneRequest): Promise<string> {
    return this.dataApiService
      .post(data, 'set_stage_one')
      .then((dataResponse) => {
        return dataResponse[0];
      });
  }

  setStageHarvest(data: StageHarvestRequest): Promise<string> {
    console.debug('CalendarService:setStageHarvest', { data });

    return this.setStage({ ...data, stage_number: 15 });
  }

  setStage(data: StageBetweenRequest | StageHarvestRequest): Promise<string> {
    console.debug('CalendarService:setStage', { data });
    return this.dataApiService.post(data, 'set_stage').then((dataResponse) => {
      return dataResponse[0];
    });
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
