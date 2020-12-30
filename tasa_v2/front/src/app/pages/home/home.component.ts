import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  notify;

  get isHome(): boolean {
    return '/initial' === this.router.url;
  }

  constructor(
    private router: Router,
    public notifyService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.notifyService.getNotifications(); 
    this.notify = setInterval(() => {
      this.notifyService.getNotifications(); 
    }, 300000);
  }

  ngOnDestroy() {
    if (this.notify) {
      clearInterval(this.notify);
    }
  }
}
