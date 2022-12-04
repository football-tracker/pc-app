const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    title: "Football Tracker",
    icon: __dirname + './src/assets/img/ballon-de-football.ico',
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
  })

  win.loadFile('./src/index.html')
}

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
});

rpc.on("ready", () => {
    
    rpc.setActivity({
        details: "Consulte Les Matchs", // Details!
        state: "Football Tracker", // State Of Your RPC Client
        startTimestamp: new Date(),
        largeImageKey: "foot", //  Name Of The Large Image You Uploaded In Assets
        largeImageText: "Le foot c'est bien" // Text When Hovered On Large Image
        
        
    });
    
    console.log("Rich Presence Is Now Active, Check Your Discord!"); // A Message In Terminal When RPC Is Turned On.
});

rpc.login({
    clientId: "1048942028433653812" // Your Client ID
})

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