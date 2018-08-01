import { buildState } from '@briebug/ngrx-auto-entity';
import { createSelector } from '@ngrx/store';
import { Account } from '../../models/account';
import {
  AccountActions,
  AccountActionType,
  SelectAccount
} from './account.actions';
import { AccountEntityState } from './account.state';

const { initialState, selectors, entityState } = buildState(Account);

export const {
  selectAll: selectAllAccounts,
  selectEntities: selectAccountEntities,
  selectIds: selectAccountIds,
  selectTotal: selectTotalAccounts
} = selectors;

export const selectSelectedAccountId = createSelector(
  entityState,
  (state: AccountEntityState) => state.selectedAccountId
);
export const selectSelectedAcount = createSelector(
  selectAccountEntities,
  selectSelectedAccountId,
  (entities, id) => id && entities[id]
);

export function reducer(
  state: AccountEntityState = initialState,
  action: AccountActions
): AccountEntityState {
  switch (action.type) {
    case AccountActionType.SelectAccount:
      return {
        ...state,
        selectedAccountId: (action as SelectAccount).payload.id
      };
    default: {
      return state;
    }
  }
}
