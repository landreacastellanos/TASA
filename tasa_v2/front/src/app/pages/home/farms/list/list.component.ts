import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public configService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.configService.initialPage = false;
  }

}
