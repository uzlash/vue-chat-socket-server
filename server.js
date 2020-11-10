// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http); 
// const cors = require('cors')
// app.use(cors())

//#region 
// const cors = require('cors')
// , { origins: '*:*'}

// io.origins((origin, callback) => {
//     if (origin !== 'https://localhost:8080') {
//       return callback('origin not allowed', false);
//     }
//     callback(null, true);
//   });
// app.use(cors())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

// io.on('connection', (socket) => {
//   console.log('Recieved socket connected', socket);
//   socket.on('disconnect', () => {
//   console.log('socket disconnected')
//   }) 
// })
//#endregion

// let users = []
// let messages = []
// let index = 0

// //Connect
// io.on('connection', socket => {

//   socket.emit('loggedIn', {
//     users: users.map(u => u.username),
//     messages: messages
//   })

//   socket.on('newUser', username => {
//     console.log(`${username} has joined.`)
//     socket.username = username
//     users.push(username)

//     io.emit('userOnline', socket.username)
//   })

//   socket.on('message', msg => {
//     let message = {
//       index: index,
//       username: socket.username,
//       message: message
//     }

//     messages.push(message)
//     io.emit('message', msg)
//     index++
//   })

//   //Disconnect
//   socket.on('disconnect', () => {
//     console.log(`${socket.username} has left.`)
//     io.emit('userLeft', socket.username)
//     users.splice(users.indexOf(socket), 1)
//   })

// })

// http.listen(3366, () => {
//   console.log('Listening on *:3366');
// })


const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

sio.on("connection", () => {
    console.log("Connected!");
});

server.listen(3366);