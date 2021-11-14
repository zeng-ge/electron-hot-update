// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  // Create the browser window.
  console.log(path.join(__dirname, 'preload.js'))
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  initIPC()
  mainWindow.webContents.openDevTools()
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function initIPC() {
  ipcMain.handle('browser:upgrade', () => {
    hotUpgrade()
  })
}

function hotUpgrade() {
  const upgradeFilePath = path.join(__dirname, 'test-upgrade.js')
  fs.writeFile(upgradeFilePath, 'console.log("fs write upgrade")', (error) => {
    if(error) {
      console.error(error)
    } else {
      console.log('upgrade success')
      app.relaunch()
      app.quit()
    }
  })
}