import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from '@core/services/auth.service';
import { AuthApi } from './api/auth.api';
import { JwtService } from './services/jwt.service';
import { PriceApi } from './api/price.api';
import { PartApi } from './api/part.api';
import { OrderApi } from './api/order.api';
import { EmployeeApi } from './api/employee.api';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EmployeeApi,
    OrderApi,
    PartApi,
    PriceApi,
    JwtService,
    AuthApi,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
})
export class CoreModule { }
