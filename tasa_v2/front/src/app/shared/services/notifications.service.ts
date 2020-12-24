import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications;

  constructor(
    public dataApiService: DataApiService,
  ) { }

  getNotifications(){
    return this.dataApiService.getAll('get_notification', environment.urlNotifications).then(data =>{
      this.notifications = data;
      console.log(data);
      
    }).catch(err => {
      console.log(err);
      
    })
  }
}
