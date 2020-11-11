import { Injectable } from '@angular/core';
import { Farm } from '../../../shared/models/farm';
import { DataApiService } from '../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class FarmsService {
  constructor(private dataApiService: DataApiService) {}
  public getFarms(): Promise<Farm[]> {
    return this.dataApiService.getAll('get_properties');
  }
}
