import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportsComponent } from './reports/reports.component';
import { LedgerComponent } from './ledger/ledger.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { CreateDatabaseComponent } from './createdatabase/createdatabase.component';

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
    path: 'createdatabase',
    component: CreateDatabaseComponent,
  },
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full'
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
    CreateDatabaseComponent
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
