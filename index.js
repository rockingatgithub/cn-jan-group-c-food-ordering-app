const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const PORT =8000
const app = express()
const http = require('http').createServer(app);
const passport = require('./config/passportJWT')
require('dotenv').config()

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())


const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

passport.initialize()

app.use('/', require('./routes'))


socketIO.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('chat message', (msg) => {
        console.log("Message received!", msg)
    })
    socket.emit('msg', 'from server')
  });

  



http.listen(PORT, (err) => {
    if(err)console.log(err)
    console.log('Server started succesfully!')
})