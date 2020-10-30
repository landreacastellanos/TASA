import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = false;

  invokeComponentLoading = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  /**
   * Obtiene el estatus actual
   */
  public getloading(): boolean {
    return this._loading;
  }

  /**
   * Asigna un estatus al flag
   * @param value
   */
  public setloading(value): void {
    this._loading = value;
    this.invokeComponentLoading.emit(value);
  }
}
