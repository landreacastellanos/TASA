import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get isHome(): boolean {
    return '/initial' === this.router.url;
  }

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}
}
