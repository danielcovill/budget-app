import { BrowserWindow } from 'electron';
import * as sqlite3 from 'sqlite3';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static BrowserWindow: typeof BrowserWindow;
    static application: Electron.App;

    private static onWindowAllClosed() {
        Main.application.quit();
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({width: 1280, height: 1024});
        Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // set up the settings database
        const settingsDB = new sqlite3.Database('settings.db');
        let settingsExist = false;
        settingsDB.get("SELECT COUNT(1) FROM sqlite_master WHERE type='table' AND name='Settings';", undefined, (err, row) => {
            settingsExist = row[0] > 0;
        });

        if (!settingsExist) {
            alert('need to create settings table');
        }

        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
