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

  public edit(userCreate: UserCreate) {
    console.error('FIXME: edit', { userCreate });

    return Promise.resolve('OK');
    // return this.dataApiService.post(userCreate, 'edit_user');
  }

  public getUsers(): Promise<User[]> {
    return this.dataApiService.getAll('get_user');
  }

  public getUsersById(id: string | number): Promise<User> {
    console.error('FIXME: getUsersById', { id });

    return Promise.resolve({
      age: 1,
      email: 'jonathanrodrigr@gmail.com',
      id: 68,
      last_name: 'Rodriguez',
      name: 'Jonathan',
      phone: 123,
      profesion: 'Ingeniero',
      role_id: 1,
    });
    // return this.dataApiService.getAll(´get_user/${id}´);
  }
}
