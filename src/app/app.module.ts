import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AccountComponent } from './containers/account/account.component';
import { AccountsComponent } from './containers/accounts/accounts.component';
import { MaterialModule } from './material.module';
import { Account } from './models/account';
import { AccountService } from './services/account.service';
import { StateModule } from './state/state.module';
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountsComponent,
    AccountFormComponent,
    AccountsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    StateModule
  ],
  providers: [
    {
      provide: Account,
      useClass: AccountService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
