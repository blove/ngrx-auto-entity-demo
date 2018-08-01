import { NgModule } from '@angular/core';
import {
  EntityOperators,
  NgrxAutoEntityService
} from '@briebug/ngrx-auto-entity';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AccountEffects } from './account/account.effects';
import { appMetaReducers, appReducer } from './app.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AccountEffects])
  ],
  providers: [EntityOperators, NgrxAutoEntityService]
})
export class StateModule {}
