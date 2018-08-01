import { buildState } from '@briebug/ngrx-auto-entity';
import { Action } from '@ngrx/store';
import { Account } from '../../models/account';
import { AccountEntityState } from './account.state';

const { initialState, selectors } = buildState(Account);

export const {
  selectAll: selectAllAccounts,
  selectEntities: selectAccountEntities,
  selectIds: selectAccountIds,
  selectTotal: selectTotalAccounts
} = selectors;

export function reducer(
  state: AccountEntityState = initialState,
  action: Action
): AccountEntityState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
