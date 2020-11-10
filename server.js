const app = require('express')();

const server = require('http').createServer();
const options = { cors:true, origins:["*:*"],};
const io = require('socket.io')(server, options);
io.on('connection', socket => { /* ... */ });
server.listen(3366, () => {
    console.log('listening on 3366')
});

let users = []
let messages = []
let index = 0

//Connect
io.on('connection', socket => {

  socket.emit('loggedIn', {
    users: users.map(u => u.username),
    messages: messages
  })

  socket.on('newUser', username => {
    console.log(`${username} has joined.`)
    socket.username = username
    users.push(username)

    io.emit('userOnline', socket.username)
  })

  socket.on('message', msg => {
    let message = {
      index: index,
      username: socket.username,
      message: message
    }

    messages.push(message)
    io.emit('message', msg)
    index++
  })

  //Disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.username} has left.`)
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket), 1)
  })

})