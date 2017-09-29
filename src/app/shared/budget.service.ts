import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { RecentDatabase } from '../../utils/RecentDatabase';

@Injectable()
export class BudgetService {

  currentBudgetFile: string;

  constructor() { }

  public createBudget(): Promise<string> {
    return new Promise(resolve => {
      ipcRenderer.on('create-budget-reply', (event, args) => {
        resolve(args.fileName);
      });
      ipcRenderer.send('create-budget');
    });
  }

  public getRecentDatabases(): Promise<RecentDatabase[]> {
    return new Promise<RecentDatabase[]>(resolve => {
      ipcRenderer.on('get-recent-databases-reply', (event, args) => {
        resolve(args);
      });
      ipcRenderer.send('get-recent-databases');
    });
  }

}
