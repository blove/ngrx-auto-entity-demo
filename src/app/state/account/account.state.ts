import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Account } from '../../models/account';

export interface AccountEntityState extends IEntityState<Account> {
  loading: boolean;
  selectedAccountId: number;
}
