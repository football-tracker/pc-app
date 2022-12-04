const { app, BrowserWindow } = require('electron')
const config = require('./config.json');
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
      buttons: [
        { label: `Nous Rejoindre`, url: `https://discord.gg/zuwvnrKBXy` }
    ],
        details: "Consulte Les Score",
        startTimestamp: new Date(),
        largeImageKey: "foot",
        largeImageText: "Le foot c'est bien"
        
        
    });
    const terminal_msg = "Le rich presence est en place regarde ton Discord !"
    console.log(terminal_msg);
    const ok = true
    if (ok === true) {
      console.log(ok)
    } else {
      console.warn("Le rich presence n'as pas été mis en place !")
    }
});

rpc.login({
    clientId: "1048979983797850152"
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