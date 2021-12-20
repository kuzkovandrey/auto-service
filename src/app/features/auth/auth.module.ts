import { AuthService } from '../../core/services/auth.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    LoginFormComponent
  ]
})
export class AuthModule { }
