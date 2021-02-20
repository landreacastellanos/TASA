import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { RolAdministrador } from '../../../shared/models/role';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ChatService } from '../chat/chat.service';

const PERMISSION_BY_PATH = {
  '/users': [new RolAdministrador().key],
  '/farms/create': [new RolAdministrador().key],
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  viewNotification = false;
  title = '';
  notifications;
  type;
  formatDates = 'd-MMM-y';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    public notifyService: NotificationsService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void { }

  get role() {
    return this.storageService.settings?.user?.roleId;
  }

  showItem(route = '') {
    switch (route) {
      case '/users':
        return PERMISSION_BY_PATH[route].includes(this.role);
      case '/farms/create':
        return PERMISSION_BY_PATH[route].includes(this.role);
      default:
        return true;
    }
  }

  closeSession() {
    this.authService.closeSession().then((data) => {
      if (data != null) {
        this.storageService.cleanUser();
        this.router.navigate(['/login']);
      }
    });
  }

  viewNotificationMethod(type) {
    this.viewNotification = !this.viewNotification
    if (this.viewNotification) {
      this.type = type;
      switch (type) {
        case 'notifications':
          this.title = 'Notificaciones';
          this.notifications = this.notifyService.notifications;
          break;
        case 'alerts':
          this.title = 'Alertas';
          this.notifications = this.notifyService.alerts;
          break;
        case 'notificationsChat':
          this.title = 'Mensajes';
          this.notifications = this.notifyService.notificationsChat;
          break;
      }
    }
  }

  async goNotification(notify) {
    this.viewNotification = false;
    await this.closeNotification(notify);
    switch (this.type) {
      case 'notifications':
        this.router.navigate(['/farms/calendar/', notify.property_id, notify.land_id, notify.stage_number]);
        break;
      case 'alerts':
        break;
      case 'notificationsChat':
        this.chatService.getMessage(notify.land_id, notify.property_id);
        this.router.navigate(['/chat/', notify.property_id, notify.land_id]);
        this.chatService.scrollPerson = false;
        this.chatService.count = 0;
        break;
    }
  }

  closeNotification(notify?) {
    const type = this.type === 'notifications' ? 1 : this.type === 'alerts' ? 2 : 3;
    return this.notifyService.deleteNotification(notify ? notify.id : '', { type });
  }
}
