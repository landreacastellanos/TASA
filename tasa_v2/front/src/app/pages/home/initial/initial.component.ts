import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.configService.initialPage = true;
  }

}
