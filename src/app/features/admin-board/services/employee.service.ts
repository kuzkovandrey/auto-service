import { ApiOrder } from '@core/models/api-order.model';
import { OrderApi } from '@core/api/order.api';
import { Employee } from '@core/models/employee.model';
import { EmployeeApi } from '@core/api/employee.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeApi: EmployeeApi,
    private orderApi: OrderApi
  ) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.employeeApi.getAllEmployees();
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.employeeApi.createEmployee(employee);
  }

  changeEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.employeeApi.changeEmployee(id, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.employeeApi.deleteEmployee(id);
  }

  getEmployeeOrders(form: {employee: string, month: string, year: string}): Observable<ApiOrder[]> {
    return this.orderApi.getEmployeeOrders(form);
  }

}
