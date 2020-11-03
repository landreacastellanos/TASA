import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { RolesBackResponse } from '../models/roles-back-response';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  allRolesPromise: Promise<Role[]>;
  constructor(public dataApiService: DataApiService) {
    this.allRolesPromise = this.getAllRoles();
  }

  public getAllRoles(): Promise<Role[]> {
    return this.dataApiService
      .getAll('get_roles')
      .then((data: RolesBackResponse) => (data.length ? data[0].role : []));
  }
}
