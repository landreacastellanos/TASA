import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications;
  public notificationsChat;
  public alerts;

  constructor(
    public dataApiService: DataApiService,
  ) { }

  getNotifications() {
    return this.dataApiService.getAll('get_notification', environment.urlNotifications).then(data => {
      this.notifications = data.length ? data.filter(notification => notification.type === 1 ) : [];
      this.alerts = data.length ? data.filter(notification => notification.type === 2 ) : [];
      this.notificationsChat = data.length ? data.filter(notification => notification.type === 3) : [];
    });
  }

  deleteNotification(id?: string) {
    return this.dataApiService.delete('delete_notification', id, environment.urlNotifications).then(() => {
      return this.getNotifications();
    });
  }
}
