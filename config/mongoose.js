const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/food_ordering_app')

const db = mongoose.connection

db.once('open', () => {console.log('Database connected!')})

module.exports = db