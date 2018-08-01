import { EntityActions } from '@briebug/ngrx-auto-entity';
import { Action } from '@ngrx/store';
import { Account } from '../../models/account';

export enum AccountActionType {
  SelectAccount = '[Account] Select Account'
}

export class SelectAccount implements Action {
  readonly type = AccountActionType.SelectAccount;

  constructor(public payload: { id: number }) {}
}

export type AccountActions = EntityActions<Account> | SelectAccount;
