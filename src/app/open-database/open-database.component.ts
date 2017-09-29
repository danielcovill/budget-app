import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';
import { RecentDatabase } from '../../utils/recentDatabase';
import { BudgetService } from '../shared/budget.service';

@Component({
  selector: 'app-open-database',
  templateUrl: './open-database.component.html',
  styleUrls: ['./open-database.component.scss'],
  providers: [ BudgetService ]
})
export class OpenDatabaseComponent implements OnInit {
  recentDatabases: RecentDatabase[];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getRecentDatabases().then((result: RecentDatabase[]) => {
      this.recentDatabases = result;
    }).catch((err: Error) => {
      // TODO: error reporting
    });
  }

  public createBudget(): void {
    this.budgetService.createBudget().then((dirPath: string) => {
      // TODO: need some kind of redirect here
    }).catch((err: Error) => {
      // TODO: error reporting of some kind here
    });
  }

}
