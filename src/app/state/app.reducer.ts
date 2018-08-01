import { reactiveEntityMetaReducer } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as accountReducer } from './account/account.reducer';
import { AppState } from './app.interfaces';

export const appReducer: ActionReducerMap<AppState> = {
  account: accountReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = [
  reactiveEntityMetaReducer
];
