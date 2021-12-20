import { Price } from '@core/models/price.model';
import { PriceApi } from '@core/api/price.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PriceService {
  constructor(private priceApi: PriceApi) {}

  getPriceList(): Observable<Price[]> {
    return this.priceApi.getPriceList();
  }

  createPrice(price: Price): Observable<Price> {
    return this.priceApi.createPrice(price);
  }

  deletePrice(id: string): Observable<Price> {
    return this.priceApi.deletePrice(id);
  }

}
