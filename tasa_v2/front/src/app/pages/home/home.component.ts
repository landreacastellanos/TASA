import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public configService: ConfigurationService
  ) { }

  ngOnInit(): void {
  }

}
