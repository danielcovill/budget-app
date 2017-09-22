import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportsComponent } from './reports/reports.component';
import { LedgerComponent } from './ledger/ledger.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateDatabaseComponent } from './create-database/create-database.component';
import { OpenDatabaseComponent } from './open-database/open-database.component';

const appRoutes: Routes = [
  {
    path: 'budget',
    component: BudgetComponent,
  },
  {
    path: 'ledger',
    component: LedgerComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'create-database',
    component: CreateDatabaseComponent,
  },
  {
    path: 'open-database',
    component: OpenDatabaseComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BudgetComponent,
    ReportsComponent,
    LedgerComponent,
    SettingsComponent,
    CreateDatabaseComponent,
    OpenDatabaseComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true }
    ),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
