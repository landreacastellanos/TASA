import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public login(userValue: string, passwordValue: string): Promise<any> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.dataApiService.post({ user: userValue, password: passwordValue, number: 1 }, 'login');
  }

  public roles(): Promise<any> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.dataApiService.getAll('get_roles');
  }
}
