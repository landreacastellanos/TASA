import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  public urlApi = '';

  constructor(
    private http: HttpClient,
    public storageService: StorageService
  ) { }

  get headers(): HttpHeaders {
    if (this.getToken()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`
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
      .get(this.urlApi + extension, { headers: this.headers })
      .toPromise();
  }

  public getById(extension: string, id: string): Promise<any> {
    return this.http
      .get(this.urlApi + extension + '/' + id, { headers: this.headers })
      .toPromise<any>();
  }

  public post(element, extension: string): Promise<any> {
    return this.http
      .post(this.urlApi + extension, element, { headers: this.headers })
      .toPromise();
  }

  public update(element, extension: string): Promise<any> {
    return this.http
      .put(this.urlApi + extension, element, { headers: this.headers })
      .toPromise();
  }

  public delete(extension: string, id: string): Promise<any> {
    return this.http
      .delete(this.urlApi + extension, { headers: this.headers })
      .toPromise();
  }
}
