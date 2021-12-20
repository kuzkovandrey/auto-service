import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartService } from '../../services/part.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Part } from '@core/models/part.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})

export class PartsComponent implements OnInit {
  parts$: Observable<Part[]>;
  form: FormGroup;
  private change$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private partService: PartService,
    private snackBar: MatSnackBar
  ) {
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit() {
    this.initChangeSubscription();
    this.initAddPartsForm();
    this.getAllParts();
  }

  createPart() {
    this.partService
      .createPart(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.change$.next(),
        this.handleError
      );
  }

  deletePart(id: string) {
    this.partService
      .deletePart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.change$.next(),
        this.handleError
      );
  }

  private initChangeSubscription() {
    this.change$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.parts$ = this.partService.getAllParts()
    );
  }

  private initAddPartsForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required])
    });
  }

  private getAllParts() {
    this.parts$ = this.partService.getAllParts();
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


}
