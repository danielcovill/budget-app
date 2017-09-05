"use strict";
exports.__esModule = true;
var settings_1 = require("./utils/settings");
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
        this.appSettings = settings_1.Settings.GetInstance();
        this.appSettings.initializeSettings(false).then(function (result) {
            Main.BrowserWindow = browserWindow;
            Main.application = app;
            Main.application.on('window-all-closed', Main.onWindowAllClosed);
            Main.application.on('ready', Main.onReady);
        })["catch"](function (err) {
            throw err;
        });
    };
    return Main;
}());
exports["default"] = Main;
