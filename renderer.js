// renderer.js
// const socket = require('socket.io-client')('http://localhost:3000');

// function sendMessage(message) {
//   if (socket.connected) {
//     socket.emit('message', message);
//   } else {
//     // Store the message locally (e.g., using IndexedDB or another storage mechanism)
//     // Attempt to send the message when the connection is restored
//     socket.once('connect', () => {
//       socket.emit('message', message);
//     });
//   }
// }

// document.getElementById('sendMessage').addEventListener('click', () => {
//   sendMessage('Hello from Electron!');
// });



// // const socket = require('socket.io-client')('http://localhost:3000');

// document.getElementById('sendMessage').addEventListener('click', () => {
//   // Send a message to the server
//   socket.emit('message', 'Hello from Electron!');
// });