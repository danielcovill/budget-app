import { Database } from 'sqlite3';

export class Settings {
    static settings: Settings;
    settingsDB: Database;

    private constructor() {
        this.settingsDB = new Database('settings.db');
    }

    public static GetInstance(): Settings {
        if (!Settings.settings) {
            Settings.settings = new Settings();
        }
        return Settings.settings;
    }

    public initializeSettings(forceReset: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!forceReset) {
                this.settingsInitialized().then(
                    (val: boolean) => {
                        if (val) {
                            resolve();
                        }
                    },
                    (err: Error) => { reject(err); }
                );
            }
            const query = `
            begin;
            DROP TABLE IF EXISTS Settings;
            CREATE TABLE 'Settings' (
                Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                Name TEXT UNIQUE NOT NULL,
                Value TEXT NOT NULL);
            commit;`;
            this.settingsDB.exec(query, (err) => { (err) ? reject(err) : resolve(); });
        });
    }

    public settingsInitialized(): Promise<boolean> {
        const query = "SELECT COUNT(1) AS dbCount FROM sqlite_master WHERE type='table' AND name='Settings';";
        return new Promise<boolean>((resolve, reject) => {
            this.settingsDB.get(query, undefined, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row.dbCount > 1) {
                        reject('Multiple settings databases detected.');
                    } else {
                        resolve(row.dbCount === 1);
                    }
                }
            });
        });
    }

    public getSetting(settingName: string): Promise<any> {
        const query = 'SELECT Value FROM Settings WHERE Name=?;';
        return new Promise<any>((resolve, reject) => {
            this.settingsDB.get(query, settingName, (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(settingName + ' settting not found');
                } else {
                    resolve(row.Value);
                }
            });
        });
    }

    public setSetting(settingName: string, settingValue: any): Promise<void> {
        const query = 'INSERT OR REPLACE INTO Settings (Name, Value) VALUES (?, ?);';
        return new Promise<void>((resolve, reject) => {
            this.settingsDB.run(query, [settingName, settingValue], (err) => { (err) ? reject(err) : resolve(); });
        });
    }
}
