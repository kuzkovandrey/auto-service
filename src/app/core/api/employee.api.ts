import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '@core/models/employee.model';
import { ApiEndpoint } from '@core/enums/api-endpoint.enum';

@Injectable()
export class EmployeeApi {
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(ApiEndpoint.EMPLOYEE);
  }

  createEmployee(person: Employee): Observable<Employee> {
    return this.http.post<Employee>(ApiEndpoint.EMPLOYEE, person);
  }

  changeEmployee(id: string, person: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${ApiEndpoint.EMPLOYEE}/${id}`, person);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${ApiEndpoint.EMPLOYEE}/${id}`);
  }

  getEmployeeSalary(form: {employee: string, month: string, year: string}): Observable<number> {
    //TODO: REFACTORING - create separate method
    const params = new HttpParams()
      .set('year', form.year)
      .set('month', form.month);

    return this.http.get<number>(
      `${ApiEndpoint.ORDER_INFO}${ApiEndpoint.SALARY}${form.employee}`,
      { params }
    );
  }
}
