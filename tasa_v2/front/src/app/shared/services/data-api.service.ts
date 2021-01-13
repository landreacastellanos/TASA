import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseBack } from '../models/response-back-model';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  public urlApi = environment.urlApi;

  constructor(
    private http: HttpClient,
    public storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  getHeaders(
    extraValues: any = { 'Content-Type': 'application/json' }
  ): HttpHeaders {
    if (this.getToken()) {
      return new HttpHeaders({
        Token: `${this.getToken()}`,
        ...extraValues,
      });
    } else {
      return new HttpHeaders({
        ...extraValues,
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

  handleOnSuccess = (result: ResponseBack) => {
    if (result && result.details && result.details.length > 0) {
      this.snackBar.open(result.details[0].value, 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
      return null;
    }
    if (result && result.data) {
      return result.data;
    } else {
      return null;
    }
  };

  handleOnError = (result: ResponseBack | any) => {
    if (result && result.details && result.details.length > 0) {
      this.snackBar.open(result.details[0].value, 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
      return null;
    }
    this.snackBar.open('Ocurrio un error', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
    return null;
  };

  public getAll(
    extension: string,
    url?: string,
    notMessage?: boolean
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    return this.http
      .get<ResponseBack>(urlGet + extension, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then((result) => {
        if (result && result.details && result.details.length > 0) {
          if (notMessage) {
            this.snackBar.open(result.details[0].value, 'x', {
              duration: 2000,
              panelClass: ['snackbar-warn'],
            });
          }
          return null;
        }
        if (result && result.data) {
          return result.data;
        } else {
          return null;
        }
      })
      .catch(this.handleOnError);
  }

  public getById(
    extension: string,
    id: string,
    extraParams?: HttpParams
  ): Promise<any> {
    return this.http
      .get<ResponseBack>(this.urlApi + extension, {
        headers: this.getHeaders(),
        params: { id, ...extraParams },
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public post(element, extension: string): Promise<any> {
    this.cleanObject(element);
    return this.http
      .post<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public postMultipart(element, extension: string): Promise<any> {
    this.cleanObject(element);
    return this.http
      .post<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders({
          Accept: 'multipart/form-data',
        }),
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public patch(element, extension: string): Promise<any> {
    this.cleanObject(element);
    return this.http
      .patch<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public update(element, extension: string): Promise<any> {
    this.cleanObject(element);
    return this.http
      .put<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public delete(
    extension: string,
    id: string,
    url?: string,
    extraParams?: HttpParams
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    const params = id ? { id, ...extraParams } : { ...extraParams };
    return this.http
      .delete<ResponseBack>(urlGet + extension, {
        headers: this.getHeaders(),
        params: params,
      })
      .toPromise()
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  cleanObject(element: object) {
    Object.keys(element).forEach((key) => {
      if (element[key] === null) {
        delete element[key];
      }
    });
  }
}
