import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public loading = false;

  constructor() { }

  public setLoadingPage(loading): void {
    this.loading = loading;
  }
}
