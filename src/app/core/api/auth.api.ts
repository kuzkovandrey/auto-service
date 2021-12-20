import { ApiEndpoint } from '@core/enums/api-endpoint.enum';
import { HttpClient } from '@angular/common/http';
import { Token } from './../models/token.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${ApiEndpoint.AUTH}${ApiEndpoint.LOGIN}`, user);
  }

}
