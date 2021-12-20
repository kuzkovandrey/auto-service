import { Injectable } from '@angular/core';
import { CookieOptions } from '../models/cookie-options.model';
import { Token } from '../models/token.model';

@Injectable()
export class JwtService {

  private setToken(name: string, value: string, options: CookieOptions = {path: '/', 'max-age': 600}): void {
    const updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path="/"; max-age=${options['max-age']}`
    console.log('set cookie: ', updatedCookie)
    document.cookie = updatedCookie;
  }

  setAccessTokens(token: Token): void {
    //TODO: Add to enum
    this.setToken('jwtAccessToken', token.accessToken);
  }

  getToken(name: string): string {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  hasToken(): boolean {
    return !!this.getToken('jwtAccessToken');
  }
}
