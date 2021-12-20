import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';;
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@core/models/user.model'

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  @Input() buttonText: string = 'Sign In';
  @Input() warningMessage?: string;
  @Output() onClickButton = new EventEmitter<User>();
  form!: FormGroup;
  isHideIcon = true;
  private destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    //TODO: Separate methods
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ]),
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.warningMessage = '');
  }

  onClickSignButton() {
    this.onClickButton.emit(this.form.value);
  }
}
