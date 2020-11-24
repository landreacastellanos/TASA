import { Injectable } from '@angular/core';
import { LandResponse } from '../../../../shared/models/lands';
import { DataApiService } from '../../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class LandsService {
  lands: { [x: string]: LandResponse } = {};
  landsSelectedIds: string;
  idProperty: string;
  idLand: string;

  constructor(private dataApiService: DataApiService) { }

  get landSelected() {
    return this.lands[this.landsSelectedIds];
  }

  public getLandById(
    idProperty: number | string,
    idLand: number | string
  ): Promise<LandResponse> {
    this.landsSelectedIds = `${idProperty}-${idLand}`;
    return this.dataApiService
      .getAll(`get_property_land?property_id=${idProperty}&land_id=${idLand}`)
      .then((data) => {
        this.lands[this.landsSelectedIds] = data[0];
        return data[0];
      });
  }

  public getListCalendar(){
    return this.dataApiService.getAll(`calendar_stage?id_lote=${this.idLand}`)
    .then((data) => {
      return data;
    });
  }
}
