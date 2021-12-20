import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Price } from '@core/models/price.model';
import { PriceService } from '../../services/price.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})

export class PriceComponent implements OnInit {
  priceList$: Observable<Price[]>;
  priceForm: FormGroup;
  private change$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private priceService: PriceService,
    private snackBar: MatSnackBar
  ) {
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {
    this.initForm();
    this.initChangeSubscription();
    this.priceList$ = this.priceService.getPriceList();
  }

  createPrice() {
    this.priceService
      .createPrice(this.priceForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.change$.next()
        this.priceForm.reset();
      }, this.handleError);
  }

  deletePrice(id: string) {
    this.priceService
      .deletePrice(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.change$.next(), this.handleError);
  }

  private initForm() {
    this.priceForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required])
    });
  }

  private initChangeSubscription() {
    this.change$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.priceList$ = this.priceService.getPriceList());
  }

  private openSnackBar(message: string) {
    //TODO: Enum for all strings
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.openSnackBar('Error... Try again.')
    console.log(error);
  }
}
