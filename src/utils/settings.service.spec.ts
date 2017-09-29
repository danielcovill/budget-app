/*

// Turns out you can't use jasmine tests for sqlite3. Mocha is required.

import { SettingsService } from './settings.service';
import { RecentDatabase } from './RecentDatabase';
import { environment } from '../environments/environment';
import * as fs from 'fs';


describe('Settings service', () => {
    let settingsService: SettingsService;

    beforeEach(() => {
        settingsService = SettingsService.GetInstance();
    });

});
    it('can properly report if the settings DB has not been initialized', () => {
        // remove the settings test db
        fs.unlinkSync(environment.databaseName);
        settingsService.settingsInitialized().then((result: boolean) => {
            expect(result).toEqual(false);
        });
    });

    it('can properly report if the settings DB has been initialized', () => {
        settingsService.initializeSettings(false).then(() => {
            return settingsService.settingsInitialized();
        }).then((result: boolean) => {
            expect(result).toEqual(true);
        });
    });

    it('can initialize the settings databases if overridden', () => {
        this.settingsService.initializeSettings(true).then(() => {
            return settingsService.settingsInitialized();
        }).then((result: boolean) => {
            expect(result).toEqual(true);
        });
    });

    it('can set and get settings', () => {
        this.settingsService.initializeSettings(true).then(() => {
            return this.settingsService.setSetting('TestSetting', 5);
        }).then(() => {
            return this.settingsService.getSetting('TestSetting');
        }).then((result: Number) => {
            expect(result).toEqual(5);
        });
    });

    it("will throw an error when getting settings that don't exist", () => {
        this.settingsService.initializeSettings(true).then(() => {
            expect(() => { this.settingsService.getSetting('SettingDoesntExist'); }).toThrow();
        });
    });
});

// describe('Settings Test Suite', () => {
*/
