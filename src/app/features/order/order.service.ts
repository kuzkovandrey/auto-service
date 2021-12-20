import { PriceApi } from '@core/api/price.api';
import { PartApi } from '@core/api/part.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '@core/models/part.model';
import { Employee } from '@core/models/employee.model';
import { OrderModel } from '@core/models/order.model';
import { OrderApi } from '@core/api/order.api';
import { EmployeeApi } from '@core/api/employee.api';
import { Price } from '@core/models/price.model';
import { OrderForm } from './models/order-form.model';

@Injectable()
export class OrderService {
  constructor(
    private employeeApi: EmployeeApi,
    private orderApi: OrderApi,
    private partApi: PartApi,
    private priceApi: PriceApi
  ) { }

  getParts(): Observable<Part[]> {
    return this.partApi.getParts();
  }

  getPriceList(): Observable<Price[]> {
    return this.priceApi.getPriceList();;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.employeeApi.getAllEmployees();
  }

  sendOrder(order: OrderForm): Observable<OrderModel> {
    return this.orderApi.createOrder(order);
  }

}
