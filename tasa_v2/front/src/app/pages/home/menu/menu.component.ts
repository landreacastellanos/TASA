import moment from 'moment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { RolAdministrador } from '../../../shared/models/role';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ChatService } from '../chat/chat.service';

const PERMISSION_BY_PATH = {
  '/users': [new RolAdministrador().key],
  '/farms/create': [new RolAdministrador().key],
  '/drones': [new RolAdministrador().key],
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('menuToggle', { static: false })
  menuToggle: ElementRef;
  @ViewChild('navbarNavDropdown', { static: false })
  navbarNavDropdown: ElementRef;
  viewNotification = false;
  // title = '';
  // notifications;
  type;
  formatDates = 'd-MMM-y';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    public notifyService: NotificationsService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

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

  onClickViewNotificationMethod(type) {
    // Close menu
    if (this.navbarNavDropdown.nativeElement.classList.contains('show')) {
      this.menuToggle.nativeElement.click();
    }

    if (!(this.viewNotification && this.type !== type)) {
      this.viewNotification = !this.viewNotification;
    }

    if (this.viewNotification) {
      this.type = type;
    }
  }

  get title() {
    switch (this.type) {
      case 'notifications':
        return 'Receta';
      case 'alerts':
        return 'Alertas';
      case 'notificationsChat':
        return 'Mensajes';
    }
  }

  get notifications() {
    switch (this.type) {
      case 'notifications':
        return this.notifyService.notifications;
      case 'alerts':
        return this.notifyService.alerts;
      case 'notificationsChat':
        return this.notifyService.notificationsChat;
      default:
        return [];
    }
  }

  async goNotification(notify) {
    this.viewNotification = false;
    await this.closeNotification(notify);
    switch (this.type) {
      case 'alerts':
      case 'notifications':
        this.router.navigate([
          '/farms/calendar/',
          notify.property_id,
          notify.land_id,
          notify.stage_number,
        ]);
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
    const type =
      this.type === 'notifications' ? 1 : this.type === 'alerts' ? 2 : 3;
    return this.notifyService.deleteNotification(notify ? notify.id : '', {
      type,
    });
  }

  formatDate(date) {
    console.log(date,this.formatDates);
    
    return moment(date).format(this.formatDates);
  }
}
