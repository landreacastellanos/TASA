import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseBack } from '../models/response-back-model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  public urlApi = environment.urlApi;

  constructor(
    private http: HttpClient,
    public storageService: StorageService,
    private snackBar: MatSnackBar
  ) { }

  get headers(): HttpHeaders {
    if (this.getToken()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': `${this.getToken()}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  public getToken(): string {
    if (this.storageService.getValue('token')) {
      const token = this.storageService.getValue('token');
      return token;
    } else {
      return null;
    }
  }

  public getAll(extension: string): Promise<any> {
    return this.http
      .get<ResponseBack>(this.urlApi + extension, { headers: this.headers })
      .toPromise().then(result => {
        if (result && result.details && result.details.length > 0) {
          this.snackBar.open(result.details[0].values, 'x', {
            duration: 2000,
          });
        }
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return [];
        }

      }).catch(err => {
        this.snackBar.open('Ocurrio un error', 'x', {
          duration: 2000,
        });
        return [];
      });
  }

  public getById(extension: string, id: string): Promise<any> {
    return this.http
      .get<ResponseBack>(this.urlApi + extension + '/' + id, { headers: this.headers })
      .toPromise().then(result => {
        if (result && result.details && result.details.length > 0) {
          this.snackBar.open(result.details[0].values, 'x', {
            duration: 2000,
          });
        }
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return [];
        }

      }).catch(err => {
        this.snackBar.open('Ocurrio un error', 'x', {
          duration: 2000,
        });
        return [];
      });
  }

  public post(element, extension: string): Promise<any> {
    return this.http
      .post<ResponseBack>(this.urlApi + extension, element, { headers: this.headers })
      .toPromise().then(result => {
        if (result && result.details && result.details.length > 0) {
          this.snackBar.open(result.details[0].values, 'x', {
            duration: 2000,
          });
        }
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return [];
        }

      }).catch(err => {
        this.snackBar.open('Ocurrio un error', 'x', {
          duration: 2000,
        });
        return [];
      });
  }

  public update(element, extension: string): Promise<any> {
    return this.http
      .put<ResponseBack>(this.urlApi + extension, element, { headers: this.headers })
      .toPromise().then(result => {
        if (result && result.details && result.details.length > 0) {
          this.snackBar.open(result.details[0].values, 'x', {
            duration: 2000,
          });
        }
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return [];
        }

      }).catch(err => {
        this.snackBar.open('Ocurrio un error', 'x', {
          duration: 2000,
        });
        return [];
      });
  }

  public delete(extension: string, id: string): Promise<any> {
    return this.http
      .delete<ResponseBack>(this.urlApi + extension, { headers: this.headers })
      .toPromise().then(result => {
        if (result && result.details && result.details.length > 0) {
          this.snackBar.open(result.details[0].values, 'x', {
            duration: 2000,
          });
        }
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return [];
        }

      }).catch(err => {
        this.snackBar.open('Ocurrio un error', 'x', {
          duration: 2000,
        });
        return [];
      });
  }
}
