import { NgModule } from '@angular/core';
import {
  EntityOperators,
  NgrxAutoEntityService
} from '@briebug/ngrx-auto-entity';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccountEffects } from './account/account.effects';
import { appMetaReducers, appReducer } from './app.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([AccountEffects])
  ],
  providers: [EntityOperators, NgrxAutoEntityService]
})
export class StateModule {}
