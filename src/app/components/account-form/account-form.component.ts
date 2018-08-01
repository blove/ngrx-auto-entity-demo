import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Account } from '../../models/account';

@Component({
  selector: 'nae-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;
  @Input() account: Account;
  @Output() update = new EventEmitter<Account>();

  private unsubscribe = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.account && simpleChanges.account.currentValue) {
      this.formGroup.patchValue(simpleChanges.account.currentValue);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, Validators.required]
    });
    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe)
      )
      .subscribe(value =>
        this.update.emit({
          ...this.account,
          ...value
        })
      );
  }
}
