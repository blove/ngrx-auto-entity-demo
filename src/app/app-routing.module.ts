import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './containers/account/account.component';
import { AccountsComponent } from './containers/accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  },
  {
    path: ':id',
    component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
