import { BrowserWindow, app, ipcMain } from 'electron';
import { SettingsService } from '../utils/settings.service';
import { BudgetDbService } from '../utils/budget-db.service';
import { RecentDatabase } from '../utils/RecentDatabase';
import { join } from 'path';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static BrowserWindow: typeof BrowserWindow;
    static application: Electron.App;
    static appSettings: SettingsService;
    static mainWindowId = 'app';

    /*
    * Events
    */

    private static onWindowAllClosed() {
        Main.application.quit();
    }

    private static onClose() {
        Main.storeWindowDetails(Main.mainWindow, Main.mainWindowId).then((res: Array<void>) => {
            Main.mainWindow = null;
        }).catch((err) => {
            throw err;
        });
    }

    private static async onResize() {
        Main.storeWindowDetails(Main.mainWindow, Main.mainWindowId).catch((err) => { throw err; });
    }

    private static onReady() {
        const heightPromise = this.appSettings.getSetting(Main.mainWindowId + '.Height');
        const widthPromise = this.appSettings.getSetting(Main.mainWindowId + '.Width');
        let heightResult = 600;
        let widthResult = 800;

        Promise.all([heightPromise, widthPromise]).then((res: Array<any>) => {
            // Get main window placement info
            heightResult = res[0];
            widthResult = res[1];
        }).catch((err: Error) => {
            /*
             * Do nothing, just use the defaults. This could be a real error but most likely it's just the
             * first run and the values haven't been initialized yet.
             */
        }).then(() => {
            // Set up the browser window however it was left last time, or defaults
            Main.mainWindow = new Main.BrowserWindow({ height: Number(heightResult), width: Number(widthResult) });
            Main.mainWindow.on('close', Main.onClose);
            Main.mainWindow.on('resize', Main.onResize);

            // Load up the main window with the New/Open Database picker
            Main.mainWindow.loadURL('file://' + join(__dirname, '..') + '/index.html');
        });
    }


    /*
    * Helper functions
    */

    private static storeWindowDetails(window: Electron.BrowserWindow, windowName: string): Promise<any> {
        const sizeArray = window.getSize();
        // const positionArray = window.getPosition();
        this.appSettings = SettingsService.GetInstance();
        const widthPromise = this.appSettings.setSetting(windowName + '.Width', sizeArray[0]);
        const heightPromise = this.appSettings.setSetting(windowName + '.Height', sizeArray[1]);
        return Promise.all([widthPromise, heightPromise]);
    }

    static main(application: Electron.App, browserWindow: typeof BrowserWindow) {
        // initialize the settings database if necessary
        this.appSettings = SettingsService.GetInstance();
        this.appSettings.initializeSettings(false).then(
            (result: void) => {
                Main.BrowserWindow = browserWindow;
                Main.application = application;
                Main.application.on('window-all-closed', Main.onWindowAllClosed);
                if (app.isReady()) {
                    Main.onReady();
                } else {
                    Main.application.on('ready', Main.onReady);
                }
            }
        ).catch((err: Error) => {
            throw err;
        });

        // set up our ipc listeners
        ipcMain.on('create-budget', BudgetDbService.createDatabase);

        ipcMain.on('get-recent-databases', async () => {
            const dbList: RecentDatabase[] = await this.appSettings.getDatabaseList();
            ipcMain.emit('get-recent-database-reply', dbList);
        });
    }
}
