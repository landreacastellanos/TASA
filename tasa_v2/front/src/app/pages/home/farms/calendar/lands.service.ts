import { Injectable } from '@angular/core';
import { ArrozDeRiego, ArrozSecano } from 'src/app/shared/models/farm';
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
  arrozSecano = new ArrozSecano();
  arrozRiego = new ArrozDeRiego();
  typeRice;
  variety: string;


  constructor(private dataApiService: DataApiService) { }

  get landSelected(): LandResponse | undefined {
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
        this.typeRice =
          this.arrozSecano.id === data[0].sowing_system ? this.arrozSecano : this.arrozRiego;
        this.variety = data[0].batchs.variety ? data[0].batchs.variety : undefined;
        return data[0];
      });
  }

  public getListCalendar() {
    return this.dataApiService.getAll(`calendar_stage?id_lote=${this.idLand}`)
      .then((data) => {
        return data;
      });
  }
}
