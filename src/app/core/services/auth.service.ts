import { JwtService } from './jwt.service';
import { AuthApi } from '../api/auth.api';
import { User } from '@core/models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@core/models/token.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private authApi: AuthApi,
    private jwtService: JwtService
  ) {}

  login(user: User): Observable<Token> {
    return this.authApi.login(user).pipe(
      tap(token => {
        this.jwtService.setAccessTokens(token);
      }));
  }

  isAuthorize(): string {
    return this.jwtService.getToken('jwtAccessToken');
  }

}
