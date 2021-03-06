# NgrxAutoEntityDemo

## Generate App

```bash
cd ~/repos
ng new ngrx-auto-entity-demo --style scss --prefix nae --routing
cd ngrx-auto-entity-demo
```

## Add Dependencies

```bash
yarn add @briebug/ngrx-auto-entity
yarn add @angular/cdk @angular/flex-layout @angular/material @ngrx/{effects,store,store-devtools} concurrently json-server
```

## Setup Proxy

```bash
touch ~/repos/ngrx-auto-entity-demo/proxy.conf.json
```

1. Open **proxy.config.json** and run snippet: `nae-proxy-config`
2. Open **package.json** and run snippet: `nae-proxy-package-json`
3. Copy data into root dir:

```bash
cp -R ~/Desktop/nae-assets/data ~/repos/ngrx-auto-entity-demo
```

## Models

Copy the models into the app

```bash
cp -R ~/Desktop/nae-assets/models ~/repos/ngrx-auto-entity-demo/src/app
```

* Note that the model is a `class` and not an `interface`.
* Use the '@Key' decorate to annotate the unique identifier or entity primary key.

## Services

Copy the services into the app

```bash
cp -R ~/Desktop/nae-assets/services ~/repos/ngrx-auto-entity-demo/src/app
```

* Note that the service must implement the `IAutoEntityService` interface.

## Components

Copy the container and presentation components into the app:

```bash
cp -R ~/Desktop/nae-assets/components ~/repos/ngrx-auto-entity-demo/src/app
cp -R ~/Desktop/nae-assets/containers ~/repos/ngrx-auto-entity-demo/src/app
```

## Create `MaterialModule`

Create **src/app/material.module.ts**:

```bash
touch ~/repos/ngrx-auto-entity-demo/src/app/material.module.ts
```

Snippet: `nae-material-module`

Open **src/index.html** and add the Material icons:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Setup Routing

Open **src/app/app-routing.module.ts** and generate routes: `nae-routes`

## Update `AppModule`

Open **src/app/app.module.ts** and run snippet: `nae-app-module`.

## Update `AppComponent` Template

Remove everything in **src/app/app.component.ts** except for the `<router-outlet>`.

## Update Styles

Open **src/app/styles.scss** and run snippet: `nae-styles`

## Create `AppState`

Create the **src/app/state** directory and the **src/app/state/app.interfaces.ts** file:

```bash
mkdir ~/repos/ngrx-auto-entity-demo/src/app/state
touch ~/repos/ngrx-auto-entity-demo/src/app/state/app.interfaces.ts
```

Generate the interfaces using snippet: `nae-state-interfaces`.

## Create `reducer()`

Create the **src/app/state/app.reducer.ts** file:

```bash
touch ~/repos/ngrx-auto-entity-demo/src/app/state/app.reducer.ts
```

Generate the reducer using the snippet: `nae-state-reducer`.

## Create `StateModule`

Create the **src/app/state/state.module.ts** file:

```bash
touch ~/repos/ngrx-auto-entity-demo/src/app/state/state.module.ts
```

Generate the module using the snippet: `nae-state-module`.

## Create Entity State

Create the **src/app/state/account** directory and the **src/app/state/app.reducer.ts** file:

```bash
mkdir ~/repos/ngrx-auto-entity-demo/src/app/state/account
touch ~/repos/ngrx-auto-entity-demo/src/app/state/account/account.state.ts
```

Generate the entity state using the snippet: `nae-account-state`.

Open **src/app/state/app.interface.ts** and add the `account` state property:

```javascript
import { AccountEntityState } from './account/account.state';

export interface AppState {
  account: AccountEntityState;
}
export type State = AppState;
```

## Create Entity Reducer

Create the **src/app/state/customer.reducer.ts** file:

```bash
touch ~/repos/ngrx-auto-entity-demo/src/app/state/account/account.reducer.ts
```

Generate the entity reducer using the snippet: `nae-account-reducer`.

Open **src/app/state/app.reducer.ts** and add the account `reducer()` function:

```javascript
import { reducer as accountReducer } from './account/account.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  account: accountReducer
};
```

## Entity Effects

Create the **src/app/state/customer.effects.ts** file:

```bash
touch ~/repos/ngrx-auto-entity-demo/src/app/state/account/account.effects.ts
```

Generate the entity reducer using the snippet: `nae-account-effects`.

* Note the use of the `ofEntityType()` operator in the obserable `pipe()`.
* Note the `EntityOperators` dependency.

The `EntityOperators` class provides crud operations:

* `create()`
* `delete()`
* `load()`
* `loadMany()`
* `update()`

## Update `StateModule`

Open **src/app/state/state.module.ts** and import the `EffectsModule`:

```javascript
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './account/account.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([AccountEffects])
  ],
  providers: [EntityOperators]
})
export class StateModule {}
```

## Update `AccountsComponent`

Open **src/app/containers/accounts/accounts.components.ts** and update the component to use the NgRx Auto Entity library:

```javascript
import { LoadMany, Delete } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../state/app.interfaces';
import { selectAllAccounts } from '../../state/account/account.reducer';
import { Account } from './../../models/account';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Observable<Array<Account>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadMany(Account));
    this.accounts = this.store.pipe(select(selectAllAccounts));
  }

  onDelete(account: Account) {
    this.store.dispatch(new Delete(Account, account));
  }
}
```

* We inject the `store` just like we're used to with NgRx.
* Dispatch the `LoadMany()` action specifying the entity class and the entity instance.
* Use the generated `selectAll` selector to get the array of ordered entities.
* Dispatch the `Delete()` action specifying the entity class and the entity instance.

## Select and Edit

Checkout the **02-select-edit-account** branch and serve the application:

```bash
git checkout 02-select-edit-account
yarn start
```
