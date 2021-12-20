import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from '@core/models/price.model';
import { ApiEndpoint } from '@core/enums/api-endpoint.enum';

@Injectable()
export class PriceApi {
  constructor(private http: HttpClient) { }

  getPriceList(): Observable<Price[]> {
    return this.http.get<Price[]>(ApiEndpoint.PRICE_LIST);
  }

  createPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(ApiEndpoint.PRICE_LIST, price);
  }

  changePrice(id: Price, price: Price): Observable<Price> {
    return this.http.patch<Price>(`${ApiEndpoint.PRICE_LIST}/${id}`, price);
  }

  deletePrice(id: string): Observable<Price> {
    return this.http.delete<Price>(`${ApiEndpoint.PRICE_LIST}/${id}`);
  }

}
