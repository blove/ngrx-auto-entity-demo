import { Component, OnInit } from '@angular/core';
import { Delete, LoadMany } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllAccounts } from '../../state/account/account.reducer';
import { AppState } from '../../state/app.interfaces';
import { Account } from './../../models/account';

const accounts: Account[] = [
  {
    id: 1,
    customer_id: 1,
    accountNumber: '31357907',
    name: 'Checking Account',
    amount: '532.34'
  },
  {
    id: 2,
    customer_id: 1,
    accountNumber: '94219031',
    name: 'Personal Loan Account',
    amount: '163.51'
  },
  {
    id: 3,
    customer_id: 1,
    accountNumber: '08572789',
    name: 'Auto Loan Account',
    amount: '410.72'
  }
];

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Observable<Array<Account>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // this.accounts = of(accounts);
    this.store.dispatch(new LoadMany(Account));
    this.accounts = this.store.pipe(select(selectAllAccounts));
  }

  onDelete(account: Account) {
    this.store.dispatch(new Delete(Account, account));
  }

  onEdit(account: Account) {
    // todo
  }
}
