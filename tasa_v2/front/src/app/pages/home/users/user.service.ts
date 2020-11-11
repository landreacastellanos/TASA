import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserCreate } from '../../../shared/models/user-create';
import { DataApiService } from '../../../shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public dataApiService: DataApiService) {}

  public create(userCreate: UserCreate) {
    return this.dataApiService.post(userCreate, 'create_user');
  }

  public edit(userUpdate: User) {
    console.error('FIXME: not well implemented edit, verify back', { userUpdate });
    return this.dataApiService.patch(
      userUpdate,
      `update_user`
    );
  }

  public delete(userUpdate: User) {
    return this.dataApiService.delete(`delete_user`, `${userUpdate.id}`);
  }

  public getUsers(): Promise<User[]> {
    return this.dataApiService.getAll('get_user');
  }

  public getUsersById(id: string | number): Promise<any> {
    return this.dataApiService
      .getById('get_info_user', `${id}`)
      .then((data) => data[0]);
  }
}
