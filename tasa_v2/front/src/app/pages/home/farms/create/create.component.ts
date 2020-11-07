import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    public configService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.configService.initialPage = false;
  }

}
