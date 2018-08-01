import { AccountEntityState } from './account/account.state';

export interface AppState {
  account: AccountEntityState;
}
export type State = AppState;
