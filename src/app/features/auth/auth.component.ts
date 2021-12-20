import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutes } from './../../core/enums/app-routes.enum';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@core/models/user.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  login(user: User) {
    this.authService
      .login(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.router.navigate([AppRoutes.ADMIN]),
        this.handleError
      );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.openSnackBar('Error... Try again.')
    console.log(error);
  }

}
