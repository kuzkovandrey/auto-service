import { ApiOrder } from './../models/api-order.model';
import { OrderForm } from './../../features/order/models/order-form.model';
import { OrderModel } from './../models/order.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '@core/enums/api-endpoint.enum';

@Injectable()
export class OrderApi {
  constructor(private http: HttpClient) {}

  createOrder(order: OrderForm): Observable<OrderModel>  {
    return this.http.post<OrderModel>(
      `${ApiEndpoint.ORDER}${ApiEndpoint.CREATE}`,
      order
    );
  }

  getOrdersByMonth(form: {month: string, year: string}): Observable<ApiOrder[]> {
    //TODO: create separate method
    const params = new HttpParams()
      .set('month', form.month)
      .set('year', form.year);
    return this.http.get<ApiOrder[]>(ApiEndpoint.ORDER_INFO, { params })
  }

  getEmployeeOrders(form: {month: string, year: string, employee: string}): Observable<ApiOrder[]> {
    //TODO: create separate method
    const params = new HttpParams()
      .set('month', form.month)
      .set('year', form.year);
    return this.http.get<ApiOrder[]>(
      `${ApiEndpoint.ORDER_INFO}${ApiEndpoint.SALARY}${form.employee}`, { params })
  }
}
