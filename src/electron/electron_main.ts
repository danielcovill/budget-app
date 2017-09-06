import { BrowserWindow, app } from 'electron';
import { Settings } from '../utils/settings';
import { join } from 'path';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static BrowserWindow: typeof BrowserWindow;
    static application: Electron.App;
    static appSettings: Settings;

    private static onWindowAllClosed() {
        Main.application.quit();
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({width: 1280, height: 1024});
        Main.mainWindow.loadURL('file://' + join(__dirname, '..') + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // set up the settings database
        this.appSettings = Settings.GetInstance();
        this.appSettings.initializeSettings(false).then(
            (result: void) => {
                Main.BrowserWindow = browserWindow;
                Main.application = app;
                Main.application.on('window-all-closed', Main.onWindowAllClosed);
                Main.application.on('ready', Main.onReady);
            }
        ).catch(
            (err: Error) => {
                throw err;
            }
        );
    }
}
