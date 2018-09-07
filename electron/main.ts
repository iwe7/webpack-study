import { BrowserWindow, app } from 'electron';
import { join } from 'path';
const root = process.cwd();
app.on('ready', () => {
    const browser = new BrowserWindow();
    browser.webContents.openDevTools()
    browser.loadURL(join('file://', root, 'dist/dev/index.html'));
})
