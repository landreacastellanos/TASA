import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private SETTINGS_KEY = 'tac';
  public settings: any = {};

  constructor() {
    this.load();
  }

  public load(defaults = {}): void {
    try {
      this.settings = JSON.parse(localStorage.getItem(this.SETTINGS_KEY));
      if (!this.settings) {
        this.settings = {};
      }
    } catch (error) {
      this.settings = {};
    }

    this._mergeDefaults(defaults);
    this.save();
  }

  public _mergeDefaults(defaults: any): void {
    this.settings = {
      ...defaults,
      ...this.settings,
    };
  }

  public merge(settings: any): void {
    this.settings = {
      ...this.settings,
      ...settings,
    };
  }

  public setValue(key: string, value: any): void {
    this.settings[key] = value;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
  }

  public setAll(value: any): void {
    this.settings = value;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(value));
  }

  public getValue(key: string): any {
    this.settings = JSON.parse(localStorage.getItem(this.SETTINGS_KEY));
    if (this.settings && this.settings[key]) {
      return this.settings[key];
    }
    return null;
  }

  public save(): void {
    return this.setAll(this.settings);
  }

  public getAllSettings(): any {
    return this.settings;
  }

  public cleanUser(): void {
    delete this.settings;
    this.settings = {};
    return this.save();
  }
}
