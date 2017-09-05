import * as sqlite from 'sqlite3';

export class Settings {
    static settings: Settings;
    settingsDB: sqlite.Database;

    private constructor() {
        this.settingsDB = new sqlite.Database('settings.db');
    }

    public static GetInstance(): Settings {
        if (!Settings.settings) {
            Settings.settings = new Settings();
        }
        return Settings.settings;
    }

    public initializeSettings(resetIfExists: boolean): Promise<void> {
        const result = new Promise<void>((resolve, reject) => {
            if (!resetIfExists) {
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
                Id INT PRIMARY KEY NOT NULL,
                Setting TEXT NOT NULL,
                Value TEXT NOT NULL);
            INSERT INTO Settings ['Setting', 'Value'] VALUES
                (['Width', '1280']),
                (['Height', '1024']);
            commit;`;
            this.settingsDB.exec(query, (err) => { reject(err); });
            resolve();
        });
        return result;
    }

    public settingsInitialized(): Promise<boolean> {
        const query = "SELECT COUNT(1) FROM sqlite_master WHERE type='table' AND name='Settings';";
        const result = new Promise<boolean>((resolve, reject) => {
            this.settingsDB.get(query, undefined, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row[0] > 1) {
                        reject('Multiple settings databases detected.');
                    } else {
                        resolve(row[0] === 1);
                    }
                }
            });
        });
        return result;
    }
}
