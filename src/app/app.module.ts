import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportsComponent } from './reports/reports.component';
import { LedgerComponent } from './ledger/ledger.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BudgetComponent,
    ReportsComponent,
    LedgerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
