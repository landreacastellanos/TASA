import { Component } from '@angular/core';
import { ConfigurationService } from './shared/services/configuration.service';
import { LoadingService } from './shared/services/loading.service';

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
  ){
    if (this.loadingService.subsVar === undefined) {
      this.loadingService.subsVar = this.loadingService.invokeComponentLoading.subscribe((loading: string) => {
        this.configService.setLoadingPage(loading);
      });
    }
  }
}
