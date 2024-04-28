import { Injectable } from '@angular/core';
import { DataApiService } from '../../../shared/services/data-api.service';
import { Drone } from 'src/app/shared/models/drone';

@Injectable({
  providedIn: 'root',
})
export class DronesService {
  constructor(public dataApiService: DataApiService) {}

  public create(droneCreate: Drone) {
    return this.dataApiService.post(droneCreate, 'post_drone');
  }

  public edit(droneUpdate: Drone, id) {
    return this.dataApiService.update(
      droneUpdate,
      `put_drone`,
      id
    );
  }

  public delete(droneUpdate: Drone) {
    return this.dataApiService.newDelete(`delete_drone`, `${droneUpdate.id}`);
  }

  public getDrones(): Promise<Drone[]> {
    return this.dataApiService.getAll('get_drones');
  }

  public getDronesById(id: string | number): Promise<Drone> {
    return this.dataApiService
      .getById('get_drone', `${id}`, true)
      .then((data) => data);
  }
}
