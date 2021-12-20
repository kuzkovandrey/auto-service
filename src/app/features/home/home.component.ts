import { AppRoutes } from '@core/enums/app-routes.enum';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  appRoutes = AppRoutes;

  constructor(private router: Router) {}

  navigateTo(...routes: string[]) {
    this.router.navigate(routes);
  }

}
