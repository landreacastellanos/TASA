import { Injectable } from '@angular/core';
import { Farm, FarmById } from 'src/app/shared/models/farm';
import { FarmsCreate } from 'src/app/shared/models/farms-create';
import { DataApiService } from 'src/app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  constructor(
    public dataApiService: DataApiService
  ) { }

  public getSystems(): Promise<any> {
    return this.dataApiService.getAll('get_planting_type');
  }

  public getUsers(): Promise<any> {
    return this.dataApiService.getAll('get_users_properties');
  }

  public saveFarm(farm: FarmsCreate): Promise<any> {
    return this.dataApiService.post(farm, 'create_property');
  }

  public getFarms(): Promise<Farm[]> {
    return this.dataApiService.getAll('get_properties');
  }

  public getFarm(id: string): Promise<FarmById> {
    return this.dataApiService.getById('get_property', id).then(data => data[0]);
  }

  public editFarm(farm: FarmsCreate): Promise<any> {
    return this.dataApiService.patch(farm, 'update_property');
  }
}
