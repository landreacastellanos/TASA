import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  public isAuthenticated(): Promise<any> {
    return this.dataApiService.getAll('is_authenticated');
  }

  public restorePassword(userValue: string): Promise<any> {
    return this.dataApiService.post({ user: userValue, restore_form: `${environment.publicFrontUrl}reset-password` }, 'restore_password');
  }

  public resetPassword(userValue: string, passwordValue: string): Promise<any> {
    return this.dataApiService.post({ user: userValue, password: passwordValue }, 'reset_password');
  }
}
