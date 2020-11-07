import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';

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
  ) {}

  ngOnInit(): void {}

  closeSession() {
    this.authService.closeSession().then((data) => {
      // TODO: uncomment whrn close_session is ready
      // if (data != null) {
        this.storageService.cleanUser();
        this.router.navigate(['/login']);
      // }
    });
  }
}
