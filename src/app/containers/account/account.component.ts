import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Load, Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Account } from '../../models/account';
import { SelectAccount } from '../../state/account/account.actions';
import { selectSelectedAcount } from '../../state/account/account.reducer';
import { AppState } from '../../state/app.interfaces';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account: Observable<Account>;

  private updatedAccount: Account;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.account = this.activatedRoute.paramMap.pipe(
      filter(paramMap => paramMap.has('id')),
      map(paramMap => +paramMap.get('id')),
      tap(id => this.store.dispatch(new Load(Account, id))),
      tap(id => this.store.dispatch(new SelectAccount({ id }))),
      switchMap(() => this.store.pipe(select(selectSelectedAcount)))
    );
  }

  onSave() {
    console.log(this.updatedAccount);
    this.store.dispatch(new Update(Account, this.updatedAccount));
  }

  onUpdate(account: Account) {
    this.updatedAccount = account;
  }
}
