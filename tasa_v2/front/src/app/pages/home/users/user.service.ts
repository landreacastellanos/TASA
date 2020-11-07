import { Injectable } from '@angular/core';
import { UserCreate } from '../../../shared/models/user-create';
import { DataApiService } from '../../../shared/services/data-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    public dataApiService: DataApiService,
  ) { }

  public create(userCreate: UserCreate){
    return this.dataApiService.post(userCreate, 'create_user');

  }
}
