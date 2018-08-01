import { Injectable } from '@angular/core';
import {
  Delete,
  EntityActionTypes,
  EntityOperators,
  Load,
  LoadMany,
  ofEntityType,
  Update
} from '@briebug/ngrx-auto-entity';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';

@Injectable()
export class AccountEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityType<Account, Load<Account>>(Account, EntityActionTypes.Load),
    this.ops.load()
  );

  @Effect()
  loadMany$ = this.actions$.pipe(
    ofEntityType<Account, LoadMany<Account>>(
      Account,
      EntityActionTypes.LoadMany
    ),
    this.ops.loadMany()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityType<Account, Delete<Account>>(Account, EntityActionTypes.Delete),
    this.ops.delete()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityType<Account, Update<Account>>(Account, EntityActionTypes.Update),
    this.ops.update()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
