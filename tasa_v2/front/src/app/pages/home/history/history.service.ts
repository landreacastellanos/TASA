import { Injectable } from '@angular/core';
import { DataApiService } from '../../../shared/services/data-api.service';
import { Drone } from 'src/app/shared/models/drone';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(public dataApiService: DataApiService) {}

  public getHistoryYear(year): Promise<Drone[]> {
    return this.dataApiService.getAll('dron_report/'+year);
  }

  public downloadHistoryYear(year): Promise<any> {
    return this.dataApiService.downloadAll('dron_report/'+year+'/report');
  }
}
