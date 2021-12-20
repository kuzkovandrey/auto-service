import { ApiOrder } from '@core/models/api-order.model';
import { OrderApi } from '@core/api/order.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrderInfoService {
  constructor(private orderApi: OrderApi) { }

  getOrdersByMonth(form: {month: string, year: string}): Observable<ApiOrder[]> {
    return this.orderApi.getOrdersByMonth(form);
  }

}
