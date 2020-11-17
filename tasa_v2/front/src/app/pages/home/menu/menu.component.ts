import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
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
}
