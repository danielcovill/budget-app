"use strict";
exports.__esModule = true;
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
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies.  This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    };
    return Main;
}());
exports["default"] = Main;
