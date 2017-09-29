import { Database } from 'sqlite3';
import { dialog } from 'electron';
import { homedir } from 'os';
import { RecentDatabase } from './RecentDatabase';

export class BudgetDbService {

  constructor() { }

  public static createDatabase(parentWindow?: Electron.BrowserWindow): string {
    const saveOptions = {
      title: 'Choose save location',
      defaultPath: homedir.toString(),
      properties: ['openDirectory', 'createDirectory']
    };
    return dialog.showSaveDialog(parentWindow, saveOptions);
  }
}
