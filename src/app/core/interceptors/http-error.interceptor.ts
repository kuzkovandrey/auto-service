import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppRoutes } from './../enums/app-routes.enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(
        (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.router.navigate([AppRoutes.AUTH]);
            //TODO: Create enum for warnings
            return throwError('Unauthorized')
          }
          return throwError('Error');
        }
      ));
  }
}
