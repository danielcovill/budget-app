import { app, BrowserWindow } from 'electron';
import Main from './electron_main';

/*
 * This timeout exists to allow the debugger to catch up. Without it, the
 * debugger doesn't attach in time resulting in a lot of missed breakpoints
 * early on.
 */
setTimeout(() => {
    Main.main(app, BrowserWindow);
}, 1000);
