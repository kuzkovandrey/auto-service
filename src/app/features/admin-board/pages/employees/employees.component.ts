import { ApiOrder } from '@core/models/api-order.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Years } from './../../configs/date.config';
import { Months } from '../../configs/date.config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit, OnDestroy {
  employees$: Observable<Employee[]>;
  months = Months;
  years = Years;
  employeeForm: FormGroup;
  salaryForm: FormGroup;
  currentCalary: number;
  personalOrders: ApiOrder[] = [];
  private change$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {
    this.getAllEmployees();
    this.initChangeSubscription();
    this.initEmployeeForm();
    this.initSalaryForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getPersonalOrders() {
    this.employeeService
      .getEmployeeOrders(
        this.prepareFormValues(this.salaryForm.value)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        //TODO: Create separate method
        orders => {
          this.personalOrders = orders;
          this.currentCalary = orders.reduce((acc, order) => acc + order.cost, 0);
          if (!orders.length) this.openSnackBar('Not found');
        },
        this.handleError
      );

  }

  createEmployee() {
    this.employeeService
      .createEmployee(this.employeeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.change$.next();
        this.employeeForm.reset();
      }, this.handleError);
  }

  deleteEmployee(id: string) {
    this.employeeService
      .deleteEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.change$.next(), this.handleError);
  }

  changeEmployeeInfo(id: string, name?: string, rate?: number) {
    //TODO: REFACTORIGN
    if (!name && !rate) return;

    const changes: Employee = {};
    if (name) changes.name = name;
    if (rate) changes.rate = rate;

    this.employeeService
      .changeEmployee(id, changes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.change$.next(), this.handleError);
  }

  private initChangeSubscription() {
    this.change$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.employees$ = this.employeeService.getAllEmployees());
  }

  private initEmployeeForm() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
    });
  }

  private initSalaryForm() {
    this.salaryForm = new FormGroup({
      month: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      employee: new FormControl('', [Validators.required]),
    });

    this.salaryForm.valueChanges.subscribe(console.log)
  }

  private getAllEmployees() {
    this.employees$ = this.employeeService.getAllEmployees();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.openSnackBar('Error... Try again.')
    console.log(error);
  }

  private prepareFormValues(form: {year: string, month: string, employee: string}) {
    const preparedForm = {...form};
    if (preparedForm.month.length === 1) preparedForm.month = `0${preparedForm.month}`;
    return preparedForm;
  }
}
