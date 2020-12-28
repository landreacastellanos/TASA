import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolesBackResponse } from '../models/roles-back-response';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public login(userValue: string, passwordValue: string): Promise<any> {
    return this.dataApiService.post({ user: userValue, password: passwordValue, number: 1 }, 'login');
  }

  public roles(): Promise<RolesBackResponse> {
    return this.dataApiService.getAll('get_roles');
  }

  public isAuthenticated(message?): Promise<any> {
    return this.dataApiService.getAll('is_authenticated', null, message);
  }

  public restorePassword(userValue: string): Promise<any> {
    return this.dataApiService.post({ user: userValue, restore_form: `${environment.publicFrontUrl}reset-password` }, 'restore_password');
  }

  public resetPassword(userValue: string, passwordValue: string): Promise<any> {
    return this.dataApiService.post({ user: userValue, password: passwordValue }, 'reset_password');
  }

  public closeSession(): Promise<any> {
    return this.dataApiService.getAll('close_session');
  }
}
