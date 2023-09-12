const { app, BrowserWindow } = require('electron')

if(require('electron-squirrel-startup')) return;

function createWindow () {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1600,
    height: 900,
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

