import { OrderModel } from '@core/models/order.model';
import { AppRoutes } from '@core/enums/app-routes.enum';
import { OrderForm } from './models/order-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Price } from '@core/models/price.model';
import { OrderService } from './order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Part } from '@core/models/part.model';
import { Employee } from '@core/models/employee.model';
import { tap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  priceList$: Observable<Price[]>;
  parts$: Observable<Part[]>;
  employees$: Observable<Employee[]>;
  form: FormGroup;
  totalPrice = 0;
  private destroy$ = new Subject<void>();
  private priceList: Price[];
  private partsList: Part[];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.handleOrderSuccess = this.handleOrderSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {
    this.initFormGroup();
    this.setMaintainceInformation();
    this.subscribeFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendOrder() {
    this.orderService.sendOrder({
      cost: this.totalPrice,
      ...this.form.value
    }).pipe(takeUntil(this.destroy$))
      .subscribe(
        this.handleOrderSuccess,
        this.handleError
      );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  private handleOrderSuccess(order: OrderModel) {
    this.form.reset();
    this.router.navigate(
      [AppRoutes.ORDER_INFO, { id: order._id, cost: order.cost }],
      { relativeTo: this.route }
    );
  }

  private handleError(error: HttpErrorResponse) {
    this.openSnackBar('Error... Try again.')
    console.log(error);
  }

  private setMaintainceInformation() {
    this.employees$ = this.orderService.getAllEmployees();
    this.parts$ = this.orderService
      .getParts()
      .pipe(tap(parts => this.partsList = parts));
    this.priceList$ = this.orderService
      .getPriceList()
      .pipe(tap(price =>this.priceList = price));
  }

  private subscribeFormChanges() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: OrderForm) => {
        this.totalPrice = this.calculatePrice(form);
        console.log(form)
      }
      );
  }

  private initFormGroup() {
    this.form = new FormGroup({
      client: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      car: new FormGroup({
        stateNumber: new FormControl('', [Validators.required, Validators.minLength(7)]),
        model: new FormControl('', [Validators.required, Validators.minLength(3)]),
        year: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      }),
      partsId: new FormControl([]),
      personId: new FormControl('', [Validators.required]),
      priceListId: new FormControl('', [Validators.required])
    });
  }

  private calculatePrice(form: OrderForm): number {
    const priceCost = this.priceList
      .find(price => price._id === form.priceListId)?.cost || 0;
    const partsCost = this.partsList
      .filter(part => form.partsId ? form.partsId.includes(part._id) : {})
      .reduce((accum, part) => accum + part.cost, 0);
    return priceCost + partsCost;
  }

}
