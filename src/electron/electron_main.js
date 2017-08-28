"use strict";
exports.__esModule = true;
var sqlite3 = require("sqlite3");
var Main = (function () {
    function Main() {
    }
    Main.onWindowAllClosed = function () {
        Main.application.quit();
    };
    Main.onClose = function () {
        Main.mainWindow = null;
    };
    Main.onReady = function () {
        Main.mainWindow = new Main.BrowserWindow({ width: 1280, height: 1024 });
        Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    };
    Main.main = function (app, browserWindow) {
        // set up the settings database
        var settingsDB = new sqlite3.Database('settings.db');
        var settingsExist = false;
        settingsDB.get("SELECT COUNT(1) FROM sqlite_master WHERE type='table' AND name='Settings';", undefined, function (err, row) {
            settingsExist = row[0] > 0;
        });
        if (!settingsExist) {
            alert('need to create settings table');
        }
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    };
    return Main;
}());
exports["default"] = Main;
