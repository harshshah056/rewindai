// // preload.js
// const mqtt = require('mqtt')
// window.mqtt = mqtt


// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld(
//   'electron',
//   {
//     doThing: () => ipcRenderer.send('do-thing')
//   }
// )


// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//   receiveMessage: (func) => {
//     ipcRenderer.on('message-from-extension', (event, message) => {
//       func(message);
//     });
//   }
// });