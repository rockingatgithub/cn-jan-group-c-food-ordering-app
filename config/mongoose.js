const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://sudhendra:z6Invz9TQWtNxs0U@cluster0.uy2kh.mongodb.net/?retryWrites=true&w=majority')

mongoose.connect('mongodb://localhost:27017/food_app')

const db = mongoose.connection

db.once('open', () => {console.log('Database connected!')})

module.exports = db