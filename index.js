const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const PORT =8000
const app = express()
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app);
const passport = require('passport')
require('dotenv').config()

app.use(cookieParser());

app.use((req, res, next) => { console.log("Logging URL", req.url), next() })
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "my_key",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));
passport.use(passport.session())


const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});




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