//TODO: Add aliases
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiOrder } from '@core/models/api-order.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderInfoService } from './../../services/order-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Months, Years } from './../../configs/date.config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit, OnDestroy {
  orders: ApiOrder[] = [];
  months = Months;
  years = Years;
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private orderInfoService: OrderInfoService,
    private snackBar: MatSnackBar
  ) {
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {
    this.initSearchForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  searchOrders() {
    this.orderInfoService
      .getOrdersByMonth(
        this.prepareFormValues(this.searchForm.value)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        //TODO: Separate method
        orders => {
          this.orders = orders;
          if (!orders.length) this.openSnackBar('Nothing')
        },
        this.handleError
      )
  }

  private initSearchForm() {
    this.searchForm = new FormGroup({
      year: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required]),
    });

    this.searchForm.valueChanges.subscribe(console.log);
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

  private prepareFormValues(form: {year: string, month: string}) {
    const preparedForm = {...form};
    if (preparedForm.month.length === 1) preparedForm.month = `0${preparedForm.month}`;
    return preparedForm;
  }
}
