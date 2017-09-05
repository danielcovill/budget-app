"use strict";
exports.__esModule = true;
var sqlite = require("sqlite3");
var Settings = (function () {
    function Settings() {
        this.settingsDB = new sqlite.Database('settings.db');
    }
    Settings.GetInstance = function () {
        if (!Settings.settings) {
            Settings.settings = new Settings();
        }
        return Settings.settings;
    };
    Settings.prototype.initializeSettings = function (resetIfExists) {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            if (!resetIfExists) {
                _this.settingsInitialized().then(function (val) {
                    if (val) {
                        resolve();
                    }
                }, function (err) { reject(err); });
            }
            var query = "\n            begin;\n            DROP TABLE IF EXISTS Settings;\n            CREATE TABLE 'Settings' (\n                Id INT PRIMARY KEY NOT NULL,\n                Setting TEXT NOT NULL,\n                Value TEXT NOT NULL);\n            INSERT INTO Settings ['Setting', 'Value'] VALUES\n                (['Width', '1280']),\n                (['Height', '1024']);\n            commit;";
            _this.settingsDB.exec(query, function (err) { reject(err); });
            resolve();
        });
        return result;
    };
    Settings.prototype.settingsInitialized = function () {
        var _this = this;
        var query = "SELECT COUNT(1) FROM sqlite_master WHERE type='table' AND name='Settings';";
        var result = new Promise(function (resolve, reject) {
            _this.settingsDB.get(query, undefined, function (err, row) {
                if (err) {
                    reject(err);
                }
                else {
                    if (row[0] > 1) {
                        reject('Multiple settings databases detected.');
                    }
                    else {
                        resolve(row[0] === 1);
                    }
                }
            });
        });
        return result;
    };
    return Settings;
}());
exports.Settings = Settings;
