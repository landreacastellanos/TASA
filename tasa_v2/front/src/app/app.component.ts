import { Component } from '@angular/core';
import { ConfigurationService } from './shared/services/configuration.service';
import { LoadingService } from './shared/services/loading.service';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(
    private loadingService: LoadingService,
    public configService: ConfigurationService,
    public notifyService: NotificationsService
  ){
    if (this.loadingService.subsVar === undefined) {
      this.loadingService.subsVar = this.loadingService.invokeComponentLoading.subscribe((loading: string) => {
        this.configService.setLoadingPage(loading);
      });
    }
    this.notifyService.getNotifications();
  }
}
