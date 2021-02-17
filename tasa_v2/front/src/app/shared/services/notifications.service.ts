import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public notifications;
  public notificationsChat;
  public alerts;

  constructor(public dataApiService: DataApiService) {}

  getNotifications() {
    // return this.dataApiService.getAll('get_notification', environment.urlNotifications)
    return this.getNotificationsMock()
    .then(data => {
      this.notifications = data.length ? data.filter(notification => notification.type === 1 ) : [];
      this.alerts = data.length ? data.filter(notification => notification.type === 2 ) : [];
      this.notificationsChat = data.length ? data.filter(notification => notification.type === 3) : [];
    });
  }
  getNotificationsMock() {
    return this.dataApiService
      .getAll('get_notification', environment.urlNotifications)
      .then((data) => {
        this.notifications = data;
      })
      .then((data) => {
        console.log('MOCKEADISISISISMO');
        const mockAlert = (index = 0) => ({
          batch_name: 'Monstrenco',
          id: index,
          id_user: 105,
          land_id: 40,
          property_id: 120,
          property_name: 'Agrficola Samudio',
          date: '2021-02-14T10:00:00.000Z',
          title: 'Preemergencia total',
          type: index%3 +1,
          user_name: 'diegol.bustamantep@gmail.cm',
        });
        this.notifications = new Array(100)
          .fill(0)
          .map((item, index) => mockAlert(index));

        return this.notifications;
      });
  }

  deleteNotification(id: string, type) {
    return this.dataApiService.delete('delete_notification', id, environment.urlNotifications,type).then(() => {
      return this.getNotifications();
    });
  }
}
