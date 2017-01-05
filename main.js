const {app, BrowserWindow, Tray} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const mariadb = require('node-mariadb')
//--
// const template = [{
// 	label: 'Edit',
// 	submenu: [
// 		{role: 'undo'},
// 		{role: 'redo'},
// 	]},
// 	{
// 		label: 'View',
// 		submenu: [
// 			{role: 'reload'}
// 		]},
// 	{
// 		role: 'help',
// 		submenu: [
// 			{label: 'Learn More',
// 			click(){require('electron').shell.openExternal('http://electron.atom.io')}
// 			}
// 		]
// 	}]

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null
let window

function createWindow () {
  // Create the browser window.
  window = new BrowserWindow({
	width: 960,
	height: 600,
	center: true,
	resizable: false,
	fullscreen: false,
	title: 'Zambian App 2',
	frame: true,
	autoHideMenuBar: true,
	backgroundColor: '#D2D3D5',
	icon: 'img/favicon.ico'
	})

  // and load the index.html of the app.
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

	tray = new Tray('img/favicon.ico')
	const contextMenu = Menu.buildFromTemplate([
		{label: 'Item1', type: 'radio'},
		{label: 'Item2', type: 'radio', checked: 'true'},
		{label: 'Item3', type: 'radio'}
	])
	tray.setToolTip('Zambia App 2')
	tray.setContextMenu(contextMenu)

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null
		tray.destroy()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    createWindow()
  }
})
