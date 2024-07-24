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

  getHeadersPdf(
    extraValues: any = { 'Content-Type': 'application/pdf',
    'Accept': 'application/pdf' }
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
    notParams?: boolean
  ): Promise<any> {
    let url = this.urlApi + extension;
    let params = new HttpParams();
    let headers = this.getHeaders();
    if (!notParams) {
      params = params.append('id', id);
    } else {
      url += `/${id}`;
    }
    return this.http
    .get<ResponseBack>(url, { headers, params })
    .toPromise()
    .then(this.handleOnSuccess)
    .catch(this.handleOnError);
  }

  public post(element, extension: string, url?: string): Promise<any> {
    this.cleanObject(element);
    const urlGet = url ? url : this.urlApi;
    return this.http
      .post<ResponseBack>(urlGet + extension, element, {
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

  public update(element, extension: string, id?: string | number): Promise<any> {
    this.cleanObject(element);
    return this.http
      .put<ResponseBack>(this.urlApi + extension + (id? `/${id}` : ''), element, {
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

  public newDelete(
    extension: string,
    id: string,
  ): Promise<any> {
    const urlGet = this.urlApi;;
    return this.http
      .delete<ResponseBack>(urlGet + extension + `/${id}`, {
        headers: this.getHeaders(),
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

  public downloadAll(
    extension: string,
    url?: string
  ): Promise<Blob> {
    const urlGet = url ? url : this.urlApi;
    return this.http
      .get<any>(urlGet + extension, {
        headers: this.getHeadersPdf(),
        responseType: 'blob' as 'json'
      })
      .toPromise()
      .then((result) => {
        return result as Blob;
      })
      .catch(this.handleOnError);
  }
}
