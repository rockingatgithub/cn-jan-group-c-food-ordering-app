const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const PORT =8000
const app = express()
const passport = require('./config/passportJWT')
require('dotenv').config()

app.use(express.urlencoded())
app.use(express.json())

app.use(cors())

passport.initialize()

app.use('/', require('./routes'))


app.listen(PORT, (err) => {
    if(err)console.log(err)
    console.log('Server started succesfully!')
})