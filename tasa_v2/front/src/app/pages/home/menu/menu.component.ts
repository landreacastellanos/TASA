import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { RolAdministrador } from '../../../shared/models/role';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    public notifyService: NotificationsService
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

  viewNotificationMethod(){
    this.viewNotification = !this.viewNotification
  }

  async goNotification(notify){
    this.router.navigate(['/farms/calendar/', notify.property_id, notify.land_id, notify.stage_number]);
    this.viewNotification = false;
    await this.closeNotification(notify);
  }

  closeNotification(notify?){
    return this.notifyService.deleteNotification(notify? notify.id : '');  
  }
}
