import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AppRoutes } from '@core/enums/app-routes.enum';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthorize()) {
      this.router.navigate([AppRoutes.AUTH]);
      return false;
    }
    return true;
  }

  canActivateChild() {
    return this.canActivate();
  }
}
